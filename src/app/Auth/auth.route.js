const express = require('express');
const firebaseAdmin = require('../../database/firebaseAdmin.connection');
// const firebase = require('../../../database/firebase.connection');
const AuthController = require('./auth.controller');

const authController = new AuthController();

const router = express.Router();

router
  .get('/login', authController.viewLogin)
  .post('/login-email', authController.handleLoginByEmail.bind(authController));

router.get('/register', authController.viewRegister);

router
  .get('/register-email', authController.viewRegisterByEmail)
  .post(
    '/register-email',
    authController.handleRegisterByEmail.bind(authController)
  );

router.get('/sign-out', authController.viewSignOut);

router
  .get('/register-phone', authController.viewRegisterByPhone)
  .post('/register-phone', authController.registerPhone.bind(authController));

module.exports = router;
