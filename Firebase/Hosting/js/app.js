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

function checkUser() {
	var user = auth.currentUser;

	if (user != null) {
		var docRef = db.collection('users').doc(user.uid).collection('user_writeable').doc('profile');
		docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Username:", doc.data().name);
			} else {
				console.log("User not found in DB");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	} else {
		console.log("No user logged in")
	}
	setTimeout(checkUser, 10000);
}

checkUser();


