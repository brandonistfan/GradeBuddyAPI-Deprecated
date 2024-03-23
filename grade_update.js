import OpenAI from "openai";
import { config } from 'dotenv';
import { getAssignmentWithQuestions } from './read_data.js';

config();
const OpenaiApiKey = process.env.GRADEBUDDY_OPENAI_API_KEY;
const openai = new OpenAI({apiKey: OpenaiApiKey});

async function main(assignmentID) {
    const assignment = await getAssignmentWithQuestions(assignmentID);

    for (const question of assignment.questions){
        try {
            const answer =  question.answer;
            const rubric = question.rubric;
            const maxScore = question.maxScore;
            const maxTokens = maxScore.toString().length;


            let prompt = `Given the answer below and based on the provided rubric, evaluate the answer concisely and provide a numerical score out of ${maxScore}. Your response, including this instruction, must not exceed ${maxTokens} tokens in total. Ensure your evaluation directly applies the criteria from the rubric.

            Answer: ${answer}
            
            Rubric: ${rubric}
            
            Provide solely a numerical score based on the rubric. The value returned should only be a number. If the characters are less than ${maxTokens}, it is fine.`;

            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: prompt }],
                model: "gpt-4-1106-preview",
                max_tokens: maxTokens,
                temperature: 0,
            });

            console.log(completion.choices[0].message['content']);

            // call update_score
        } catch (error) {
            // send error to firebase database for specific question
        }
    }
}

main("REYUvIEh0Mc2zEjdvYRs");
// main("2");
