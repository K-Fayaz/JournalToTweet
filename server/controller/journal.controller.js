const User    = require("../models/user.model");
const Journal = require("../models/journal.model");
const { getUser } = require("../helpers/getUser.helper");
const { DateTime } = require("luxon");


const AddJournal = async (req,res) => {
    try{
        let jwtPayload = getUser(req.headers);
        let user = await User.findById(jwtPayload.id).populate('journals');

        let journal = user.journals.find(journal => journal.date === req.body.date);

        // Get user's timezone and calculate time in their timezone
        const userTimezone = user.timeZone || 'UTC';
        const now = DateTime.now().setZone(userTimezone);
        
        // Format time in user's timezone
        let currentTime = now.toFormat('HH:mm');

        let newEntry = {
            time: currentTime,
            content: req.body.journal
        }

        let entry;
        if (!journal) {
            let journalPayload = {
                date: req.body.date,
                entries: [newEntry]
            }

            let newJournal = await Journal.create(journalPayload);
            entry = newJournal.entries[0];
            user.journals.push(newJournal);
            await user.save();
        } else {
            journal.entries.unshift(newEntry);
            await journal.save();
            entry = journal.entries[0];
        }

        res.status(200).json({
            entry,
            status: true,
            message: "Journal Added",
        });
    }
    catch(err){
        return res.status(500).json({ status: false, message: err.message });
    }
}

const getJournal = async (req,res) => {
    try {
        let jwtPayload = getUser(req.headers);
        let { date } = req.query;

        let user = await User.findById(jwtPayload.id).populate('journals');
        let journal = user.journals.find(j => j.date == date);

        return res.status(200).json({
            status: true,
            journal
        });
    }
    catch(err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

const deleteJournalEntry = async(req,res) => {
    try {
        let { date, id } = req.query;
        let jwtPayload = getUser(req.headers);

        let user = await User.findById(jwtPayload.id).populate('journals');
        let journal = user.journals.find(j => j.date == date);

        if (!journal) {
            return res.status(404).json({ status: false, message: "Journal not found for this date" });
        }

        let updatingJournal = await Journal.findById(journal._id);
        updatingJournal.entries = updatingJournal.entries.filter(entry => entry._id.toString() !== id);
        await updatingJournal.save();

        res.status(200).json({
            status: true
        });
    }
    catch(err){
        return res.status(500).json({ status: false, message: err.message });
    }
}

const editJournalEntry = async (req,res) => {
    try {
        let { date, id } = req.query;
        const { content } = req.body;
        let jwtPayload = getUser(req.headers);

        let user = await User.findById(jwtPayload.id).populate('journals');
        let journal = user.journals.find(j => j.date == date);

        if (!journal) {
            return res.status(404).json({ status: false, message: "Journal not found for this date" });
        }

        let updatingJournal = await Journal.findById(journal._id);
        let entryFound = false;
        updatingJournal.entries = updatingJournal.entries.map(entry => {
            if (entry._id.toString() !== id) return entry;
            entryFound = true;
            return {
                ...entry.toObject(),
                content
            };
        });

        if (!entryFound) {
            return res.status(404).json({ status: false, message: "Entry not found" });
        }

        await updatingJournal.save();

        return res.status(200).json({
            status: true,
            entry: updatingJournal.entries.find(entry => entry._id.toString() == id)
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

const getAcivity = async (req, res) => {
    try {
        let { month, year } = req.query;
        if (!month) {
            return res.status(400).json({ status: false, message: "Month is required" });
        }
        if (!year) {
            year = new Date().getFullYear();
        }

        let jwtPayload = getUser(req.headers);
        let user = await User.findById(jwtPayload.id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Calculate start and end date strings
        const startDate = `${year}-${month}-01`;
        const endDateObj = new Date(year, parseInt(month), 0);
        const endDate = `${year}-${month}-${String(endDateObj.getDate()).padStart(2, '0')}`;

        // Generate all dates in the month
        const daysInMonth = endDateObj.getDate();
        const activity = {};
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${month}-${String(day).padStart(2, '0')}`;
            activity[dateKey] = 0;
        }

        // Query journals by user's journal IDs and date range
        const journals = await Journal.find({
            _id: { $in: user.journals },
            date: { $gte: startDate, $lte: endDate }
        });

        // Overwrite activity for dates with journals
        journals.forEach(journal => {
            activity[journal.date] = journal.entries.length;
        });

        return res.json({ status: true, activity });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Something went wrong!"
        });
    }
}

module.exports = {
    AddJournal,
    getJournal,
    getAcivity,
    editJournalEntry,
    deleteJournalEntry
}