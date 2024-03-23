import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { config } from 'dotenv';

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

async function getAssignmentWithQuestions(assignmentId) {
    let assignment = {
        id: assignmentId,
        questions: []
    };

    const assignmentRef = doc(db, 'assignments', assignmentId);
    await getDoc(assignmentRef);
    const questionsRef = collection(assignmentRef, 'questions');
    const questionsSnapshot = await getDocs(questionsRef);

    if (questionsSnapshot.empty) {
        console.log('No questions found in this assignment.');
        return assignment;
    }

    questionsSnapshot.forEach(doc => {
        let questionData = doc.data();
        let question = {
            id: doc.id,
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