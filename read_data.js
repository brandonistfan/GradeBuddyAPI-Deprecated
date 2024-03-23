const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();

// Function to get an assignment with its questions
async function getAssignmentWithQuestions(assignmentId) {
    // Initialize the assignment object
    let assignment = {
        id: assignmentId,
        questions: []
    };

    // Reference to the specific assignment document
    const assignmentRef = db.collection('assignments').doc(assignmentId);
    const assignmentSnapshot = await assignmentRef.get();

    // Check if the assignment document exists
    if (!assignmentSnapshot.exists) {
        console.log('No such assignment!');
        return null;
    }

    // Reference to the questions subcollection of the assignment
    const questionsRef = assignmentRef.collection('questions');
    const questionsSnapshot = await questionsRef.get();

    // Check if the questions collection is empty
    if (questionsSnapshot.empty) {
        console.log('No questions found in this assignment.');
        return assignment; // Return the assignment with an empty questions list
    }

    // Loop through each question document
    questionsSnapshot.forEach(doc => {
        let questionData = doc.data();

        // Construct a question object with the required attributes
        let question = {
            answer: questionData.answer,
            maxScore: questionData.maxScore,
            question: questionData.question,
            rubric: questionData.rubric,
            score: questionData.score
        };

        // Add the question to the assignment's questions list
        assignment.questions.push(question);
    });

    return assignment;
}

// Example usage:
// Note: You need to replace 'your-assignment-id' with the actual assignment document ID
getAssignmentWithQuestions('your-assignment-id').then(assignment => {
    if (assignment) {
        console.log('Assignment with questions:', assignment);
    }
});
