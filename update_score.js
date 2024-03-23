import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCB-oz8W7o4OUDcjSVac2hIEVGBr1YSKeo",
    authDomain: "gradebuddy-hoohacks.firebaseapp.com",
    projectId: "gradebuddy-hoohacks",
    storageBucket: "gradebuddy-hoohacks.appspot.com",
    messagingSenderId: "843512705843",
    appId: "1:843512705843:web:1ac2927d3c682d828bc446"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function updateQuestionScore(assignmentId, questionId, newScore) {
    const questionRef = db.collection('assignments').doc(assignmentId).collection('questions').doc(questionId);

    try {
        await questionRef.update({
            score: newScore
        });
        console.log(`Score updated to ${newScore} for question ID ${questionId} in assignment ID ${assignmentId}`);
    } catch (error) {
        console.error('Error updating question score:', error);
    }
}

export { updateQuestionScore };