const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve user info from the sign up form
    // ToDo - validation on fields
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    
    // Temporary console logging for debugging
    //console.log(email, password);

    // Creating an authorized user with email and password
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user.uid);    
        window.location.href = "/signupForm.html";
        return null;
    // An error catch to alert the user about a failed sign up
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        return null; 
    });
});