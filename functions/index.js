import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import {gradeUpdate} from "../grade_update.js";

admin.initializeApp();

export const gradeAssignments = functions.firestore
    .document('assignments/{assignmentId}')
    .onWrite(async (snap, context) => {
        const assignmentID = context.params.assignmentId;
        await gradeUpdate(assignmentID)
    });