const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

const db = admin.firestore()

exports.createUserAccount = functions.region('europe-west1').auth.user().onCreate(event => {
    const uid = event.uid
    const email = event.email
    const newUserRef = db.collection("users").doc(`${uid}`)
    return newUserRef.set({
        email: email
    }).then(function() {
        console.log("Document successfully created!")
    }).catch(function(error) {
        console.error("Error creating document: ", error);
    })
})

exports.deleteUserAccount = functions.region('europe-west1').auth.user().onDelete(event => {
    const uid = event.uid
    const userRef = db.collection("users").doc(`${uid}`)
    return userRef.delete().then(function() {
        console.log("Document successfully deleted!")
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    })
})
