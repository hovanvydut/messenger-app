const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: 'https://messenger-app-339d8.firebaseio.com',
});

module.exports = firebaseAdmin;
