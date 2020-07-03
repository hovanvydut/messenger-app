import express from 'express';
import ProfileController from './profile.controller.js';
import AuthMiddleware from '../Auth/auth.middleware.js';

const router = express.Router();

const authMiddleware = new AuthMiddleware();
const profileController = new ProfileController();

router.post(
  '/update',
  authMiddleware.validateToken,
  profileController.updateProfile.bind(profileController)
);

export default router;
