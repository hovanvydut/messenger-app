import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA-u5azTWOevDaYviJJssWRMAl3iQJ67qw',
  authDomain: 'messenger-app-339d8.firebaseapp.com',
  databaseURL: 'https://messenger-app-339d8.firebaseio.com',
  projectId: 'messenger-app-339d8',
  storageBucket: 'messenger-app-339d8.appspot.com',
  messagingSenderId: '362065430798',
  appId: '1:362065430798:web:8362787c5fbe80012c6f5f',
  measurementId: 'G-YDZ342JL6F',
};

firebase.initializeApp(firebaseConfig);

/* class Firebase {
  static _instance;
  constructor() {
    if (_instance) return _instance;
    this.initFirebase();
  }

  initFirebase() {
    if (!_instance) {
      firebase.initializeApp(firebaseConfig);
      this._instance = firebase;
    }
  }
} */

export default firebase;
