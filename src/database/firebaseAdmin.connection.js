const firebaseAdmin = require('firebase-admin');
const serviceAccountPath = require('../../serviceAccount.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountPath),
  databaseURL: 'https://messenger-app-339d8.firebaseio.com',
});

module.exports = firebaseAdmin;
