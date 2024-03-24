import { gradeUpdate } from "./grade_update.js";


export async function main(assignmentID) {
    await gradeUpdate(assignmentID);
    process.exit();
}
