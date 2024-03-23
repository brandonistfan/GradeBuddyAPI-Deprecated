const firebase = require("firebase/app");
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCB-oz8W7o4OUDcjSVac2hIEVGBr1YSKeo",
    authDomain: "gradebuddy-hoohacks.firebaseapp.com",
    projectId: "gradebuddy-hoohacks",
    storageBucket: "gradebuddy-hoohacks.appspot.com",
    messagingSenderId: "843512705843",
    appId: "1:843512705843:web:1ac2927d3c682d828bc446"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// Function to update the score of a specific question
async function updateQuestionScore(assignmentId, questionId, newScore) {
    // Reference to the specific question document
    const questionRef = db.collection('assignments').doc(assignmentId).collection('questions').doc(questionId);

    try {
        // Update the 'score' field of the question document
        await questionRef.update({
            score: newScore
        });
        console.log(`Score updated to ${newScore} for question ID ${questionId} in assignment ID ${assignmentId}`);
    } catch (error) {
        console.error('Error updating question score:', error);
    }
}

// Example usage:
// Note: You need to replace 'your-assignment-id' and 'your-question-id' with the actual IDs
// and provide the new score you want to set.
updateQuestionScore('your-assignment-id', 'your-question-id', 95).then(() => {
    console.log('Question score updated successfully.');
});
