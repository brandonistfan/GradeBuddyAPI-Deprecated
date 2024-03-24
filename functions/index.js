const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {gradeUpdate} = require("../grade_update");
admin.initializeApp();

exports.processNewAssignment = functions.firestore
    .document('assignments/{assignmentId}')
    .onWrite(async (snap, context) => {
        const assignmentID = context.params.assignmentId;
        await gradeUpdate(assignmentID)
    });