import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/*
    Adds doc to users collection on user creation
*/
exports.addUserDoc = functions.auth.user().onCreate(async (authData) => {
    try {
        const db = admin.firestore();

        let userData = {
            activityNames: [],
            schedules: []
        };
        
        await db.collection('users').doc(authData.uid).set(userData);
        console.log(`Created user: ${authData.uid}`);
    } catch (err) {
        console.error(err);
    }
});