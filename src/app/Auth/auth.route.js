const express = require('express');
const firebaseAdmin = require('../../database/firebaseAdmin.connection');
// const firebase = require('../../../database/firebase.connection');
const control = require('./auth.controller');

const authController = new control.AuthController();

const router = express.Router();

router
  .get('/login', authController.viewLogin)
  .post('/login-email', control.handleLoginByEmail);

router.get('/register', authController.viewRegister);

router
  .get('/register-email', authController.viewRegisterByEmail)
  .post('/register-email', authController.handleRegisterByEmail);

router.get('/sign-out', authController.viewSignOut);

router.get('/register-phone', authController.viewRegisterByPhone);

module.exports = router;
