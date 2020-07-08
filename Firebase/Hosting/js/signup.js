const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve user info from the sign up form
    // ToDo - validation on fields
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    const name = signupForm['name'].value;
    const dob = signupForm['dob'].value;
    const gender = signupForm['gender'].value;
    const interests = signupForm['interests'].value;
    
    // Temporary console logging for debugging
    //console.log(email, password, dob, gender, interests);

    // Creating an authorized user with email and password
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user.uid);
        // Creating a Firestore entry with the users id attaching the relevant fields of the sign up form
        return db.collection('users').doc(cred.user.uid).collection('user_writeable').doc('profile').set({
            name: name,
            dob: dob,
            gender: gender,
            interests: interests
        }).then(cred => {
            window.location.href = "/event.html";
        });
    // An error catch to alert the user about a failed sign up
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        return null; 
    });
});