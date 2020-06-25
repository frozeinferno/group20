
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    const dob = signupForm['dob'].value;
    const gender = signupForm['gender'].value;
    const interests = signupForm['interests'].value;
    
  
    console.log(email, password, dob, gender, interests);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        return db.collection('users').doc(cred.user.uid).collection('user_writeable').doc('profile').set({
            dob: dob,
            gender: gender,
            interests: interests
        });

    });
  
    
  });