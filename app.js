import OpenAI from "openai";
import { config } from 'dotenv';

config();

const openai = new OpenAI({apiKey: process.env.GRADEBUDDY_OPENAI_API_KEY});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Who won the 2023 superbowl?." }],
            model: "gpt-4-0125-preview",
        });

        console.log(completion.choices[0].message['content']);
    } catch (error) {
        console.error("Failed to fetch completion:", error);
    }
}

main();
