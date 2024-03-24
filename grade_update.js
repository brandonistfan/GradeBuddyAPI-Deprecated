import OpenAI from "openai";
import {config} from 'dotenv';
import {getQuestion} from './read_data.js';
import {updateQuestionScore} from "./update_score.js";

config();
const openaiApiKey = process.env.GRADEBUDDY_OPENAI_API_KEY;
const openai = new OpenAI({apiKey: openaiApiKey});

async function gradeUpdate(assignmentID, questionID) {
    const question = await getQuestion(assignmentID, questionID);

    let failCounter = 0;

    const curScore = question.score;

    if (curScore === -1) {
        try {
            const answer = question.answer;
            const rubric = question.rubric;
            const maxScore = question.maxScore;
            const maxTokens = maxScore.toString().length;

            let prompt = `Given the answer below and based on the provided rubric, evaluate the answer concisely and provide a numerical score out of ${maxScore}. Your response, including this instruction, must not exceed ${maxTokens} tokens in total. Ensure your evaluation directly applies the criteria from the rubric.

                Answer: ${answer}
                
                Rubric: ${rubric}
                
                Based on the following rubric, return a numerical score as the output. Please return the evaluation result as a number, without any additional text or explanation.`;

            const completion = await openai.chat.completions.create({
                messages: [{role: "system", content: prompt}],
                model: "gpt-4-1106-preview",
                max_tokens: maxTokens,
                temperature: 0,
            });

            const newScore = completion.choices[0].message['content'];

            await updateQuestionScore(assignmentID, questionID, newScore);
        } catch (error) {
            if (failCounter <= 10) {
                failCounter++;
                await gradeUpdateQuestion(assignmentID, questionID);
            }
        }
    }
}

export {gradeUpdate};