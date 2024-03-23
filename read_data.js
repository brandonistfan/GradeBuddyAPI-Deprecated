// Import statements for Firebase 10.9 using the modular API
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);

// Function to get an assignment with its questions
async function getAssignmentWithQuestions(assignmentId) {
    let assignment = {
        id: assignmentId,
        questions: []
    };

    const assignmentRef = doc(db, 'assignments', assignmentId);
    const assignmentSnapshot = await getDoc(assignmentRef);

    if (!assignmentSnapshot.exists()) {
        console.log('No such assignment!');
        return null;
    }

    const questionsRef = collection(assignmentRef, 'questions');
    const questionsSnapshot = await getDocs(questionsRef);

    if (questionsSnapshot.empty) {
        console.log('No questions found in this assignment.');
        return assignment; // Return the assignment with an empty questions list
    }

    questionsSnapshot.forEach(doc => {
        let questionData = doc.data();
        let question = {
            answer: questionData.answer,
            maxScore: questionData.maxScore,
            question: questionData.question,
            rubric: questionData.rubric,
            score: questionData.score
        };
        assignment.questions.push(question);
    });

    return assignment;
}

export { getAssignmentWithQuestions };

// Example usage:
// Note: You need to replace 'your-assignment-id' with the actual assignment document ID
getAssignmentWithQuestions('your-assignment-id').then(assignment => {
    if (assignment) {
        console.log('Assignment with questions:', assignment);
    }
});
