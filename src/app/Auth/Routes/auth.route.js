const express = require('express');
const firebase = require('../../../database/firebase.connection');
const control = require('../Controllers/auth.control');

const router = express.Router();

router
  .get('/login', (req, res) => {
    return res.render('app/login');
  })
  .post('/login-email', control.handleLoginByEmail);

router
  .get('/register', (req, res) => {
    return res.render('app/auth/register');
  })
  .get('/register-email', (req, res) => {
    return res.render('app/auth/register-email');
  })
  .get('/sign-out', (req, res) => {
    return res.render('app/sign-out');
  })
  .get('/register-phone', (req, res) => {
    return res.render('app/login-phone-number');
  });

module.exports = router;
