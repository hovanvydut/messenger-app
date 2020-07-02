async function registerWithEmail(event) {
  event.preventDefault();
  const username = document.getElementById('usernameRegisterEmail').value;
  const email = document.getElementById('emailRegisterEmail').value;
  const password = document.getElementById('passwordRegisterEmail').value;
  let customToken;
  try {
    customToken = await axios.post('/account/register-email', {
      username,
      email,
      password,
    });
    // show message
    Swal.fire({
      icon: 'success',
      title: 'Verify email !!!',
      confirmButtonText: 'Go to login page',
      text: 'Please check your email and confirm active-link <3',
    }).then((result) => {
      if (result.value) window.location.replace('/account/login');
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data,
    });
  }
}

/* ****** */
async function signInWithGoogle(event) {
  event.preventDefault();
  const ggProvider = new firebase.auth.GoogleAuthProvider();
  try {
    result = await firebase.auth().signInWithPopup(ggProvider);

    const ggAccessToken = result.credential.accessToken;
    localStorage.setItem('ggAccessToken', ggAccessToken);
    console.log(result);
    alert('OK');
    const token = await result.user.getIdToken(true);
    localStorage.setItem('token', token);
    window.location.replace('/');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;
  try {
    const response = await axios({
      method: 'POST',
      url: '/account/login-email',
      data: { email, password },
    });
    localStorage.setItem('token', response.data.token);
    window.location.replace('/');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
}

// Sign Out
if (document.getElementById('signOutPage')) {
  window.localStorage.removeItem('token');
  firebase
    .auth()
    .signOut()
    .then(function () {
      let count = 4;
      const counterRedirect = setInterval(() => {
        count--;
        if (count < 0) {
          clearInterval(counterRedirect);
          window.location.replace('/account/login');
          return;
        }
        document.getElementById('signOutPage').innerHTML = count;
      }, 1000);
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Signout failed!',
      });
    });
}

async function signInPhone(event) {
  event.preventDefault();
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'normal',
      callback: async function (response) {
        const phoneNumber = document.getElementById('phoneNumberFromUserInput')
          .value;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(async function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            document.getElementById('login-phone-step2').style.display =
              'block';
            document.getElementById('recaptcha-container').style.display =
              'none';
            document.getElementById('signInPhoneBtn').style.display = 'none';
            console.log('check');
            document
              .getElementById('codeNumberBtn')
              .addEventListener('click', (event) => {
                event.preventDefault();
                const codeNumber = document.getElementById('codeNumber').value;
                confirmationResult
                  .confirm(codeNumber)
                  .then(async function (result) {
                    // User signed in successfully.

                    var user = result.user;
                    const token = await user.getIdToken(true);
                    localStorage.setItem('token', token);
                    await axios.post('/account/register-phone', {
                      phone: phoneNumber,
                      id: firebase.auth().currentUser.uid,
                    });
                    window.location.replace('/');
                  })
                  .catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: error.message,
                    });
                  });
              });
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            });
          });
      },
      'expired-callback': function () {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Recaptcha expried',
        });
      },
    }
  );
  window.recaptchaVerifier.render();
}
