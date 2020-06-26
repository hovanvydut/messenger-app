const router = require('express').Router();
const ProfileController = require('./profile.controller');
const AuthMiddleware = require('../Auth/auth.middleware');

const authMiddleware = new AuthMiddleware();
const profileController = new ProfileController();

router.post(
  '/update',
  authMiddleware.validateToken,
  profileController.updateProfile.bind(profileController)
);

module.exports = router;
