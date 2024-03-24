import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { main } from './app.js';

admin.initializeApp();

export const processNewAssignment = functions.firestore
    .document('assignments/{assignmentId}')
    .onWrite(async (change, context) => {
        const assignmentID = context.params.assignmentId;
        console.log(assignmentID);
        await(main(assignmentID));
    });
