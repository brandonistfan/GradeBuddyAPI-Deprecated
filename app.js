import {gradeUpdate} from "./grade_update.js";

async function main(assignmentID, questionID) {
    let failCounter = 0;
    await gradeUpdate(assignmentID, questionID, failCounter);
    process.exit();
}