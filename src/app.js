require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();
const configRouter = require('./config/config.route');
const mainRouter = require('./routes/main.route');

// config
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./src/public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

// router
configRouter(app, express);
app.use(mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
