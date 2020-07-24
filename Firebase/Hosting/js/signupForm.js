const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve user info from the sign up form
    // ToDo - validation on fields
    const displayname = signupForm['displayname'].value;
    const dob = signupForm['dob'].value;
    const gender = signupForm['gender'].value;
    const interests = signupForm['tags-input'].value;
    
    if(displayname == "" || dob == "" || gender == ""){
        alert("Please fill in all fields")
        return null;
    }

    if(interests == ""){
        alert("Please enter a minimum of 1 interest")
        return null;
    }

    // Getting the current authorized user
    var user = auth.currentUser;
    console.log(user.uid);
    user.updateProfile({
        displayName: displayname
    });
    // Creating a Firestore entry with the users id attaching the relevant fields of the sign up form
    return db.collection('users').doc(user.uid).collection('user_writeable').doc('profile').set({
        dob: dob,
        gender: gender,
        interests: interests
    }).then(cred => {
        window.location.href = "/events.html";
    })
});