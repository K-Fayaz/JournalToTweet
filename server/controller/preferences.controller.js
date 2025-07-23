const User = require("../models/user.model");
const { getUser, getAvailableTimeSlots, getLockedTimeSlots } = require("../helpers/getUser.helper");
const { tweetQueue } = require("../jobs/queue");
const { DateTime } = require('luxon');

async function scheduleUserJobs(user) {
    // Remove previous jobs for this user
    const jobs = await tweetQueue.getRepeatableJobs();
    for (const job of jobs) {
        if (job.id === String(user._id)) {
            await tweetQueue.removeRepeatableByKey(job.key);
        }
    }

    // Schedule new jobs for each time slot
    for (const slot of user.timeSlots) {
        console.log("slot update  : ", slot);
        const [hour, minute] = slot.split(':');
        // Convert to UTC
        const utc = DateTime.fromObject(
            { hour: +hour, minute: +minute },
            { zone: "Asia/Kolkata" }
        ).toUTC();

        // Schedule a repeatable job
        await tweetQueue.add(
            'send-tweet-suggestion',
            { userId: user._id, time: slot },
            {
                repeat: {
                    cron: `${utc.minute} ${utc.hour} * * *`,
                    tz: 'UTC'
                },
                jobId: String(user._id) + '-' + slot // unique per user/slot
            }
        );
    }
}

const updatePreferences = async (req, res) => {
    try {
        let {
            selectedTones,
            selectedTimeSlots,
            customPrompt
        } = req.body;

        let jwtPayload = getUser(req.headers);
        const userId = jwtPayload.id;
        
        // Get current user to check existing time slots and timezone
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Get locked (past) time slots from current user's preferences
        const lockedTimeSlots = getLockedTimeSlots(currentUser.timeSlots, currentUser.timeZone);
        
        // Validate that user is not trying to remove locked time slots
        if (selectedTimeSlots && Array.isArray(selectedTimeSlots)) {
            const missingLockedSlots = lockedTimeSlots.filter(slot => !selectedTimeSlots.includes(slot));
            if (missingLockedSlots.length > 0) {
                return res.status(400).json({ 
                    status: false, 
                    message: `Cannot remove or modify locked time slots that have already passed today: ${missingLockedSlots.join(', ')}` 
                });
            }
        }

        // Fallback to defaults if not provided or empty
        if (!selectedTones || !Array.isArray(selectedTones) || selectedTones.length === 0) {
            selectedTones = ["Professional", "Helpful"];
        }
        if (!selectedTimeSlots || !Array.isArray(selectedTimeSlots) || selectedTimeSlots.length === 0) {
            selectedTimeSlots = ["09:00", "13:00", "17:00"];
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                selectedTones,
                timeSlots: selectedTimeSlots,
                customPrompt
            },
            { new: true }
        );

        await scheduleUserJobs(updatedUser);

        res.status(200).json({ status: true, message: "Preferences updated successfully", preferences: updatedUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message });
    }
}

const getUserPreferences = async(req,res) => {
    try{
        let jwtPayload = getUser(req.headers);
        let user = await User.findById(jwtPayload.id);

        if (!user) {
            return res.status(400).json({
                status: false,
                message:"user not found"
            });
        }

        // Get available and locked time slots
        const availableTimeSlots = getAvailableTimeSlots(user.timeSlots, user.timeZone);
        const lockedTimeSlots = getLockedTimeSlots(user.timeSlots, user.timeZone);

        let preferences = {
            customPrompt: user.customPrompt,
            selectedTones: user.selectedTones,
            selectedTimeSlots: user.timeSlots,
            availableTimeSlots: availableTimeSlots,
            lockedTimeSlots: lockedTimeSlots,
            timeZone: user.timeZone
        };

        return res.status(200).json({
            status: true,
            data: preferences
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = {
    updatePreferences,
    getUserPreferences,
}