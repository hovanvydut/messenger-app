async function signInWithGoogle(event) {
  event.preventDefault();
  const ggProvider = new firebase.auth.GoogleAuthProvider();
  try {
    result = await firebase.auth().signInWithPopup(ggProvider);

    const ggAccessToken = result.credential.accessToken;
    localStorage.setItem('ggAccessToken', ggAccessToken);

    const token = await result.user.getIdToken(true);
    localStorage.setItem('token', token);
    window.location.replace('/');
  } catch (error) {
    alert(error.message);
  }
}

// Register
async function registerWithEmail(event) {
  event.preventDefault();
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    window.location.href = '/account/login';
  } catch (error) {
    alert(error.message);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await result.user.getIdToken(true);
    localStorage.setItem('token', token);
    window.location.replace('/');
  } catch (error) {
    alert(error);
  }
}

// Sign Out
if (document.getElementById('signOutPage')) {
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
      alert('SignOut failed');
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
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            document.getElementById('login-phone-step2').style.display =
              'block';

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
                    window.location.replace('/');
                  })
                  .catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    alert(error.message);
                  });
              });
          })
          .catch(function (error) {
            alert(error.message);
          });
      },
      'expired-callback': function () {
        alert('recaptcha expire');
      },
    }
  );
  window.recaptchaVerifier.render();
}
