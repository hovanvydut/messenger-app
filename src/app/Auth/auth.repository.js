import firebaseClient from '../../database/firebase.connection.js';
import firebaseAdmin from '../../database/firebaseAdmin.connection.js';
import knex from '../../database/knex.connection.js';

class AuthRepository {
  static instance;

  constructor() {}

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  loginByEmail(email, password) {
    return firebaseClient.auth().signInWithEmailAndPassword(email, password);
  }

  createUser(obj) {
    return firebaseAdmin.auth().createUser(obj);
  }

  insert(obj) {
    return knex('users').insert(obj);
  }
}

export default AuthRepository;
