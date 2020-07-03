import express from 'express';
import authRouter from '../app/Auth/auth.route.js';
import profileRouter from '../app/Profile/profile.route.js';
import friendRouter from '../app/Friend/friend.route.js';

const router = express.Router();

router.use('/account', authRouter);

router.use('/profile', profileRouter);

router.use('/friends', friendRouter);

router.get('/', (req, res) => {
  return res.render('app/conversation/index');
});

export default router;
