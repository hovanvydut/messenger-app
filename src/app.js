require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

// config
const PORT = 3000 || process.env.PORT;
app.use(logger('dev'));
app.use('/static', express.static('./src/public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

// router
app
  .get('/account/login', (req, res) => {
    return res.render('app/login');
  })
  .get('/account/register', (req, res) => {
    return res.render('app/auth/register');
  })
  .get('/account/register-email', (req, res) => {
    return res.render('app/auth/register-email');
  });
app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
