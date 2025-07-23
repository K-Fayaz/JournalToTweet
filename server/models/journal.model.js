const mongoose = require("mongoose");
const { Schema } = mongoose;

const journalEntrySchema = new Schema({
    time: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const journalSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    entries: [journalEntrySchema]
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
