const firebaseClient = require('../../database/firebase.connection');
const firebaseAdmin = require('../../database/firebaseAdmin.connection');
const knex = require('../../database/knex.connection');

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

module.exports = AuthRepository;
