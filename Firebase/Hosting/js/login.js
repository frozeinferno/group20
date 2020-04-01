const auth = firebase.auth();
const signupForm = document.querySelector('#login-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;

  console.log(email, password);

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    });
});