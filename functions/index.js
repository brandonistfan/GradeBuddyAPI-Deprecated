const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.processNewAssignment = functions.firestore
    .document('assignments/{assignmentId}')
    .onWrite(async (snap, context) => {
        const assignmentID = context.params.assignmentId;
        console.log(assignmentID)
    });