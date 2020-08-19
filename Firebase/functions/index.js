const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const secrets = require("./secrets.json");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const APP_ID = secrets.algolia.app;
const ADMIN_KEY = secrets.algolia.admin_key;

exports.createUserAccount = functions.region("europe-west1").auth.user().onCreate((event) => {
	const uid = event.uid;
	const newUserRef = db.collection("users").doc(`${uid}`);
	return newUserRef.set({
		uid: uid
	}).then(function () {
		console.log("Document successfully created!");
	}).catch(function (error) {
		console.error("Error creating document: ", error);
	});
});

exports.deleteUserAccount = functions.region("europe-west1").auth.user().onDelete((event) => {
	const uid = event.uid;
	const userRef = db.collection("users").doc(`${uid}`);
	return userRef.delete().then(function () {
		console.log("Document successfully deleted!"); // TODO: Remove orphaned events
	}).catch(function (error) {
		console.error("Error removing document: ", error);
	});
});