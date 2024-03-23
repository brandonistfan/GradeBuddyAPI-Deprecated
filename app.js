import OpenAI from "openai";
import { config } from 'dotenv';

config();

const openai = new OpenAI({apiKey: process.env.GRADEBUDDY_OPENAI_API_KEY});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "What ChatGPT model is this?" }],
            model: "gpt-4-1106-preview",
        });

        console.log(completion.choices[0].message['content']);
    } catch (error) {
        console.error("Failed to fetch completion:", error);
    }
}

main();
