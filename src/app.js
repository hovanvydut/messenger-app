import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import configRouter from './config/config.route.js';
import router from './routes/main.route.js';

dotenv.config();

const app = express();

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
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
