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
		window.location.href = "/event.html";
		console.log(cred.user.displayName);
	
	// An error catch to alert the user about a failed login
	}).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        return null; 
    });
});