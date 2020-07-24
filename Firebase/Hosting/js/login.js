const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get user login info from loginForm on login.html
	const email = loginForm['email'].value;
	const password = loginForm['password'].value;

	// Temporary console logging for debugging
	//console.log(email, password);

		// Signing in with the retrieved user email and password
	auth.signInWithEmailAndPassword(email, password).then((cred) => {
		window.location.href = "/events.html";	
	// An error catch to alert the user about a failed login
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage);
		alert(errorMessage);
		return null; 
	});
});
function fbsignin(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().useDeviceLanguage();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;
	console.log(user);



	// ...
}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// The email of the user's account used.
	var email = error.email;
	// The firebase.auth.AuthCredential type that was used.
	var credential = error.credential;
	// ...
});


}
