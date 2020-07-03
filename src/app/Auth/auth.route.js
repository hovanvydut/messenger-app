import express from 'express';
import firebaseAdmin from '../../database/firebaseAdmin.connection.js';
import AuthController from './auth.controller.js';

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

export default router;
