import {initializeApp} from "firebase/app";
import {getFirestore, doc, updateDoc} from "firebase/firestore";
import {config} from 'dotenv';

config();

const firebaseApiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "gradebuddy-hoohacks.firebaseapp.com",
    projectId: "gradebuddy-hoohacks",
    storageBucket: "gradebuddy-hoohacks.appspot.com",
    messagingSenderId: "843512705843",
    appId: "1:843512705843:web:1ac2927d3c682d828bc446"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateQuestionScore(assignmentId, questionId, newScore, updateFailCounter) {
    const questionRef = doc(db, 'assignments', assignmentId, 'questions', questionId);
    let score = null;
    if (newScore !== -1) {
        score = Number(newScore);
    }

    try {
        await updateDoc(questionRef, {
            score: score
        });
    } catch (error) {
        updateFailCounter++;
        await updateQuestionScore(assignmentId, questionId, newScore, updateFailCounter);
    }
}

export {updateQuestionScore};