const { Worker, connection } = require('./queue');
const User = require('../models/user.model');
const { sendJournalEmail } = require('../helpers/sendEmail.helper');
const { generateTweetPrompt } = require("../helpers/prompt.hepler");
const { callGemini } = require("../helpers/llm.helper");
const TweetSuggestion = require("../models/tweetSuggestion.model");

// Helper to compare "HH:mm" times
function isTimeInWindow(entryTime, prevSlot, currentSlot) {
    if (prevSlot < currentSlot) {
        return entryTime > prevSlot && entryTime <= currentSlot;
    } else {
        // Handles wrap-around midnight
        return entryTime > prevSlot || entryTime <= currentSlot;
    }
}

const worker = new Worker('tweet-suggestions', async job => {
    const { userId } = job.data;
    let { time } = job.data;
    const user = await User
                        .findById(userId)
                        .populate('journals')
                        .populate('tweets');
    if (!user) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    console.log("time slots: ", time);

    if (!time && job.opts?.repeat?.jobId) {
        console.log("id: ",job.opts?.repeat?.jobId)
        const parts = job.opts?.repeat?.jobId.split('-');
        time = parts[parts.length - 1];
    }

    if (!user.timeSlots.includes(time)) {
        console.log("Returning Now : as this is not in selected times");
        return;
    }

    const timeSlots = user.timeSlots;
    const currentSlot = time;
    const currentIndex = timeSlots.indexOf(currentSlot);
    const previousIndex = (currentIndex - 1 + timeSlots.length) % timeSlots.length;
    const previousSlot = timeSlots[previousIndex];

    let userJournals = user.journals;
    let journal = userJournals.find(j => j.date == formattedDate);

    // Check if journal exists for today
    if (!journal) {
        await sendJournalEmail("Nologs",user.name,user.email,[]);
        return;
    }

    let journalEntries = journal.entries.filter(entry =>
        isTimeInWindow(entry.time, previousSlot, currentSlot)
    );

    // Check if there are any journal entries
    if (journalEntries.length === 0) {
        console.log(`No journal entries found for ${user.email} on ${formattedDate}`);
        await sendJournalEmail("Nologs",user.name,user.email,[]);
        return;
    }

    let tones = user.selectedTones;
    let customPrompt = user.customPrompt;
    let prompt = generateTweetPrompt(tones,customPrompt,journalEntries);

    let response = await callGemini(prompt);
    let tweets;
    
    try {
        tweets = JSON.parse(response);
        // Ensure tweets is an array
        if (!Array.isArray(tweets)) {
            console.error(`Invalid response format for ${user.email}: expected array, got ${typeof tweets}`);
            return;
        }
    } catch (error) {
        console.error(`Failed to parse LLM response for ${user.email}:`, error);
        return;
    }

    let userTweets = user.tweets.find(t => t.date == formattedDate);

    let allTweets = tweets.map(t => {
        return {
            time,
            content: t
        }
    });

    if (!userTweets) {
        let todaysTweets = await TweetSuggestion.create({
            date: formattedDate,
            entries: allTweets
        });

        user.tweets.push(todaysTweets._id);
        await user.save();
    } else {
        let todaysTweets = await TweetSuggestion.findById(userTweets._id);
        todaysTweets.entries.push(...allTweets);
        await todaysTweets.save();
    }
    console.log(tweets);

    // Send the email
    await sendJournalEmail("suggest",user.name,user.email, tweets);

    // Log for debugging
    console.log(`Triggering tweet suggestion for ${user.email} at ${new Date().toISOString()}`);
}, { connection });

worker.on('completed', job => {
    console.log(`Job ${job.id} completed`);
});
worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});