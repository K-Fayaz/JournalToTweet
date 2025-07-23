const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: false
    },
    journals: [{
        type: Schema.Types.ObjectId,
        ref: "Journal"
    }],
    selectedTones: {
        type: [String],
        enum: [
            "Professional", "Casual", "Humorous", "Inspiring","Technical",
            "Helpful","Authentic","Storytelling", "GenZ"
        ],
        default: ["Professional","Helpful"],
        required: false
    },
    customPrompt: {
        type:String,
        required: false
    },
    timeSlots: {
        type: [ String ],
        enum: [
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
        ],
        default: [],
        required: false
    },
    timeZone: {
        type:String,
        required: true,
        default: "UTC"
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: "TweetSuggestion"
    }]
});

const User = mongoose.model("User",userSchema);
module.exports = User;