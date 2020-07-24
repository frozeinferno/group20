var firebaseConfig = {
	apiKey: "AIzaSyCELqGd1KY8mtLbBLuaWGR-n8Cv6x1SeCQ",
	authDomain: "com2027-group-20.firebaseapp.com",
	databaseURL: "https://com2027-group-20.firebaseio.com",
	projectId: "com2027-group-20",
	storageBucket: "com2027-group-20.appspot.com",
	messagingSenderId: "260658215959",
	appId: "1:260658215959:web:0d16d2c9800d71397e3052",
	measurementId: "G-LSNE703MJ1"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Setting global references
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
	if (user == null){
		if (window.location.href != "https://com2027-group-20.firebaseapp.com/signupForm" && 
			window.location.href != "https://com2027-group-20.firebaseapp.com/index") {
			window.location.href = "/index.html";
			return null
		}
	}
	if (user.displayName == null){
		if (window.location.href != "https://com2027-group-20.firebaseapp.com/signupForm" && 
			window.location.href != "https://com2027-group-20.firebaseapp.com/index") {
			window.location.href = "/signupForm.html";
			return null
		}
	}
});

function checkUser() {
	var user = auth.currentUser;
	if (user != null) {
		console.log(user.displayName);
	} else {
		console.log("No user logged in");
	}
}