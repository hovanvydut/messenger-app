const methodOverride = require('method-override');

const configRoute = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
  app.use((req, res, next) => {
    res.locals.firebaseApiKey = process.env.FIREBASE_API_KEY;
    res.locals.firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
    res.locals.firebaseMessaginSenderId =
      process.env.FIREBASE_MESSAGING_SENDER_ID;
    res.locals.firebaseAppId = process.env.FIREBASE_APP_ID;
    res.locals.firebaseMeasurementId = process.env.FIREBASE_MEASUREMENT_ID;

    next();
  });
};

module.exports = configRoute;
