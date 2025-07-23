

const generateTweetPrompt = (tones, prompt, journals) => {
    return `
        You are a skilled content distiller and writing strategist.

        Your task is to convert unstructured, timestamped journal entries into short, punchy, standalone tweets for a broad social media audience.

        These should read as if written by a real person — raw, engaging, and personality-driven. Avoid anything robotic, generic, or overly polished.

        ## Hard Rules:
        1. **Each journal entry should be treated independently**, unless entries are clearly on the *same topic* and written within 3–5 minutes of each other. Do not mix unrelated themes in a single tweet.
        2. Generate **one tweet per journal entry** (or tight cluster of entries on the same theme). Do not force merge different ideas.

        ## Each tweet should:
        - Be under 300 characters
        - Feel authentic, personal, and scroll-stopping
        - Be free of corporate tone, filler, or cliché
        - Read naturally in the author’s voice
        - Include **at least 1–2 tweets with soft engagement prompts** (e.g. “anyone else?”, “what’s your take?”, “relatable?”)
        - When a single journal entry includes multiple updates, events, or tasks, treat them as a cohesive unit. Summarize or group them naturally into one tweet, instead of breaking each bullet point into its own tweet.
        - Highlight any especially interesting, unique, or impressive parts, but maintain the original structure and intention of the journal.

        ## Style guidance:
        - Keep tone casual, sharp, and confident
        - Emojis or hashtags are optional — only use them if they enhance tone or clarity
        - Avoid "trying to go viral" — write for humans, not algorithms

        ## User Preferences:
        ### Selected Tones:
        ${tones}

        ## Journal Entries to Convert:
        ${journals}

        Return distinct short-form tweets as an array.
        - No explanations, no headings.
        - No template literals, markdown, or extra wrapping.
        - Only output the array.
        - Dont wrap the array in any sort of inverted single or double commas or even template literals.. just return raw array
        `

};
  
const editTweetWithPrompt = (oldTweet,prompt) => {
    return `
        You are a skilled content distiller and writing strategist.

        Your task is to update the older tweet user had based on the user prompt.

        here is the tweet that needs to be updated:
        ${oldTweet}

        and here is the prompt according to which you need to update the tweet.
        ${prompt}

        The updated tweet should be sent in this format of an array, it should have only one value inside of it.
        ['<updated tweet>']

        Thats it, no other explanatory text or anything, just the updated tweet inside the array

        ## The tweet should:
        - Be under 300-450 characters
        - Feel authentic, personal, and scroll-stopping
        - Be free of corporate tone, filler, or cliché

        Return distinct short-form tweets as an array.
        - No explanations, no headings.
        - No template literals, markdown, or extra wrapping.
        - Only output the array.

    `   
}

module.exports = {
    generateTweetPrompt,
    editTweetWithPrompt
}