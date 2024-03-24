import OpenAI from "openai";
import {getAssignmentWithQuestions} from './read_data.js';
import {updateQuestionScore} from "./update_score.js";

const openai = new OpenAI({apiKey: "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"});

async function gradeUpdate(assignmentID) {
    const assignment = await getAssignmentWithQuestions(assignmentID);

    let failCounter = 0;

    for (const question of assignment.questions) {
        const curScore = question.score;
        if (curScore === -1) {
            try {
                const answer = question.answer;
                const rubric = question.rubric;
                const maxScore = question.maxScore;
                const maxTokens = maxScore.toString().length;
                const questionID = question.id;

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

                let updateFailCounter = 0;

                await updateQuestionScore(assignmentID, questionID, newScore,updateFailCounter);
            } catch (error) {
                if (failCounter <= 10) {
                    failCounter++;
                    await gradeUpdate(assignmentID);

                }
            }
        }
    }
}

export {gradeUpdate};