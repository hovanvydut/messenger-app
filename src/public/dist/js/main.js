$(document).ready(function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  $('#login-phone-number').submit(function (event) {
    event.preventDefault();

    const phoneNumber = $('input[name="phoneNumber"]').val();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        const firstName = $('input[name="firstName"]').val();
        const lastName = $('input[name="lastName"]').val();
        $('#login-phone-step1').remove();
        $('#login-phone-step2').css('display', 'block');

        $('#phone-number-verify').submit(function (event) {
          event.preventDefault();
          const code = $('input[name="code"]').val();
          confirmationResult.confirm(code).then(function (result) {
            var user = result.user;
            console.log(user);

            const body = {
              firstName,
              lastName,
              phoneNumber,
              forceRefresh: user.refreshToken
            }
            $.post('/login-phone-number', body);

          }).catch(function (error) {
            console.log('error2', error);
          });
        });
      }).catch(function (error) {
        console.log('error', error);
      });
  })
});
