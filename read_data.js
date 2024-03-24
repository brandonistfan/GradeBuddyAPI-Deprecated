import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc} from "firebase/firestore";
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

async function getQuestion(assignmentId, questionId) {
    const questionRef = doc(db, 'assignments', assignmentId, 'questions', questionId);
    const questionSnapshot = await getDoc(questionRef);

    if (!questionSnapshot.exists()) {
        console.log('No such question found!');
        return null;
    }

    let questionData = questionSnapshot.data();
    return {
        id: questionSnapshot.id,
        answer: questionData.answer,
        maxScore: questionData.maxScore,
        question: questionData.question,
        rubric: questionData.rubric,
        score: questionData.score
    };
}

export {getQuestion};