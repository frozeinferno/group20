const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

const db = admin.firestore()

exports.createUserAccount = functions.auth.user().onCreate(event => {
    const uid = event.uid
    const email = event.email
    const newUserRef = db.collection("users").doc(`${uid}`).set({
        email: email
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
