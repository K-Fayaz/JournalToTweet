const User = require("../models/user.model");
const TweetSuggestion = require("../models/tweetSuggestion.model");
const { getUser } = require("../helpers/getUser.helper");
const { editTweetWithPrompt } = require("../helpers/prompt.hepler");
const { callGemini } = require("../helpers/llm.helper");

const getTweetSuggestions = async (req, res) => {
    try {
        const { date } = req.query;
        const jwtPayload = getUser(req.headers);
        let user = await User.findById(jwtPayload.id).populate('tweets');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let todaysSuggestion = user.tweets.find(t => t.date == date);
        let tweets = todaysSuggestion?.entries || [];

        // Group tweets by time
        const tweetsByTime = {};
        tweets.forEach(tweet => {
            const time = tweet.time;
            if (!tweetsByTime[time]) {
                tweetsByTime[time] = [];
            }
            tweetsByTime[time].push({
                _id: tweet._id,
                time: tweet.time,
                content: tweet.content,
                starred: tweet.starred,
                liked: tweet.liked,
                date: date
            });
        });

        res.status(200).json({
            success: true,
            data: tweetsByTime
        });
    } catch (error) {
        console.error('Error getting tweet suggestions:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const editTweet = async(req,res) => {
    try{
        const { id, date, content } = req.body;
        let jwtPayload = getUser(req.headers);
        
        let user = await User.findById(jwtPayload.id).populate('tweets');
        if(!user) {
            return res.status(404).json({
                status: false,
                message:"user not found"
            });
        }

        let allTweets = user.tweets.find(t => t.date == date);
        
        if (!allTweets) {
            return res.status(404).json({
                status: false,
                message: "No Tweet found for this date"
            });
        }

        // Find the TweetSuggestion document directly
        let tweetSuggestion = await TweetSuggestion.findById(allTweets._id);
        console.log("tweet suggestions: ",tweetSuggestion);
        if (!tweetSuggestion) {
            return res.status(404).json({
                status: false,
                message: "TweetSuggestion document not found"
            });
        }

        // Find the entry by id
        let entry = tweetSuggestion.entries.id(id);
        console.log("entry: ", entry);
        if (!entry) {
            return res.status(404).json({
                status: false,
                message: "Tweet entry not found"
            });
        }

        entry.content = content;
        await tweetSuggestion.save();

        return res.status(200).json({
            status: true,
            message: "Tweet updated successfully",
            data: entry
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

const deleteTweet = async (req, res) => {
    try {
        const { id, date } = req.body;
        let jwtPayload = getUser(req.headers);

        let user = await User.findById(jwtPayload.id).populate('tweets');
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user not found"
            });
        }

        let allTweets = user.tweets.find(t => t.date == date);
        if (!allTweets) {
            return res.status(404).json({
                status: false,
                message: "No Tweet found for this date"
            });
        }

        let tweetSuggestion = await TweetSuggestion.findById(allTweets._id);
        if (!tweetSuggestion) {
            return res.status(404).json({
                status: false,
                message: "TweetSuggestion document not found"
            });
        }

        let entry = tweetSuggestion.entries.id(id);
        if (!entry) {
            return res.status(404).json({
                status: false,
                message: "Tweet entry not found"
            });
        }

        tweetSuggestion.entries.pull({ _id: id });
        await tweetSuggestion.save();

        return res.status(200).json({
            status: true,
            message: "Tweet deleted successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

function safeParseTweetArray(str) {
    // Try normal JSON parse first
    try {
      const parsed = JSON.parse(str);
      // If it's a string, wrap in array
      if (typeof parsed === 'string') return [parsed];
      // If it's an array, return as is
      if (Array.isArray(parsed)) return parsed;
      // If it's an object, wrap in array
      return [parsed];
    } catch (e) {
      // Try to fix single quotes to double quotes (only for array/object)
      let fixed = str.trim();
      // Only attempt if it looks like an array or object
      if ((fixed.startsWith('[') && fixed.endsWith(']')) || (fixed.startsWith('{') && fixed.endsWith('}'))) {
        // Replace only the outer single quotes with double quotes
        fixed = fixed.replace(/'/g, '"');
        try {
          const parsed = JSON.parse(fixed);
          if (typeof parsed === 'string') return [parsed];
          if (Array.isArray(parsed)) return parsed;
          return [parsed];
        } catch (e2) {
          // Still failed, fall through
        }
      }
      // As a last resort, return the original string in an array
      return [str];
    }
}
const editWithAI = async(req,res) =>{
    try {
        let { prompt,date } = req.body;
        let { id } = req.params;

        let jwtPayload = getUser(req.headers);

        let user = await User.findById(jwtPayload.id).populate('tweets');

        let userTweets = user.tweets.find(t => t.date == date);
        if (!userTweets) {
            console.log("Tweets nto fond");
            return res.status(400).json({
                status: false,
                message:"Not found"
            });
        }

        let tweetSuggestion = await TweetSuggestion.findById(userTweets._id);

        if (!tweetSuggestion) {
            return res.status(404).json({
                status: false,
                message: "TweetSuggestion document not found"
            });
        }

        let entry = tweetSuggestion.entries.id(id);
        if (!entry) {
            return res.status(404).json({
                status: false,
                message: "Tweet entry not found"
            });
        }

        let oldTweet = entry.content;
        let llmPrompt = editTweetWithPrompt(oldTweet,prompt);

        let response = await callGemini(llmPrompt);
        let updatedTweet = safeParseTweetArray(response);

        entry.content = updatedTweet[0];
        await tweetSuggestion.save();

        res.status(200).json({
            status: true,
            data: updatedTweet[0]
        });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = {
    editTweet,
    editWithAI,
    deleteTweet,
    getTweetSuggestions,
};