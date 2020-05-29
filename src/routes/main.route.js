const express = require('express');
const authRouter = require('../app/Auth/Routes/auth.route');

const router = express.Router();

router.use('/account', authRouter);
router.get('/', (req, res) => res.send('Hello'));

module.exports = router;
