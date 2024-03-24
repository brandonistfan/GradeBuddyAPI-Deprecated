const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.gradeAssignments = functions.firestore
    .document('assignments/{assignmentId}')
    .onCreate((snap, context) => {
        const newAssignment = snap.data();
        console.log('New assignment uploaded:', newAssignment);
        return snap.ref.set({ graded: true }, { merge: true });
    });