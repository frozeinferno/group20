
const loginForm = document.querySelector('#login-form');


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  console.log(email, password);

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    });
});