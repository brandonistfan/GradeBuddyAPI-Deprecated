import OpenAI from "openai";
import { config } from 'dotenv';

config();

const openai_api_key = process.env.GRADEBUDDY_OPENAI_API_KEY;

const openai = new OpenAI({apiKey: openai_api_key});

async function main() {
    const assignment = 'add implementation here';

    // for questions in questions try each question here

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "What ChatGPT model is this?" }],
            model: "gpt-4-1106-preview",
        });

        // call update_score

        console.log(completion.choices[0].message['content']);
    } catch (error) {
        // send error to firebase database for specific question
    }
}

main();
