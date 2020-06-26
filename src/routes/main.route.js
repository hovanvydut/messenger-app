const router = require('express').Router();
const authRouter = require('../app/Auth/auth.route');
const profileRouter = require('../app/Profile/profile.route');
const friendRouter = require('../app/Friend/friend.route');

router.use('/account', authRouter);

router.use('/profile', profileRouter);

router.use('/friends', friendRouter);

router.get('/', (req, res) => {
  return res.render('app/conversation/index');
});

module.exports = router;
