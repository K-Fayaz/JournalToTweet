require("dotenv").config()
const { GoogleGenAI } = require("@google/genai");
const { generateTweetPrompt } = require("./prompt.hepler");
const { sendJournalEmail } = require("./sendEmail.helper");


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const journals = [
    "This is what I did on Saturday .. 1. Created backend apis for saving tweet suggestion for my journal to tweet app 2. created a calender view in github contribution style to track the journal progress 3. A backend job that emails suggested tweet ideas to your email which can be edited and posted directly on X 4. Bought a domain - journaltotweet.com",
    "For tomorrow, its gonna be tinkering my UI/UX for the app",
    "I should try capcut for video demo creation",
    "I got started with medium last week, bought medium membership of $5, posted two stories, but no engagement at all",
    "I guess I am a newbie over there, I will be consistantly posting it on medium, everything from now on, specially my journey of building 12 projects in 12 months",
    "Also I made a list of a few medium publications that I am interested in, I have requedted to write for them in their publications - I believe that will help and give a little boost"
]

const tones = [
    "Savage",
    "GenZ",
    "Humorous",
    "Authentic",
    "Technical"
]

const prompt = "Generate engaging tweets that reflect my personality as a developer. Focus on being authentic, helpful, and relatable. Include relevant hashtags and emojis when appropriate. Keep the tone professional but approachable."

const callGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

let call = async () => {
    let llmprompt = generateTweetPrompt(tones,prompt,journals);
    let response = await callGemini(llmprompt);
    let tweets = JSON.parse(response);
    console.log(tweets)
    await sendJournalEmail('Fayaz','kfayaz1407@gmail.com',tweets);
}

// call();

module.exports = {
    callGemini
}