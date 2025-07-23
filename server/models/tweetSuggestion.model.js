const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const suggestionEntrySchema = new Schema({
    time: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    starred: {
        type:Boolean,
        required: false,
        default: false
    },
    liked: {
        type: Boolean,
        required: false,
        default: false
    }
});

const tweetSuggestionSchema = new Schema({
    date: {
        type:String,
        required: true
    },
    entries: [suggestionEntrySchema]
});

const TweetSuggestion = model('TweetSuggestion',tweetSuggestionSchema);

module.exports = TweetSuggestion;