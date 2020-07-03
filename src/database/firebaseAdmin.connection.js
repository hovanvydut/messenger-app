import firebaseAdmin from 'firebase-admin';

import serviceAccount from '../../serviceAccount.js';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount()),
  databaseURL: 'https://messenger-app-339d8.firebaseio.com',
});

export default firebaseAdmin;
