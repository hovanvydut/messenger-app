const firebaseAdmin = require('firebase-admin');

class AuthMiddleware {
  async validateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      req.authUser = {
        user_id: decodedToken.user_id,
      };
      if (decodedToken.phone_number)
        req.authUser.phone_number = decodedToken.phone_number;
      if (decodedToken.email) req.authUser.email = decodedToken.email;
      return next();
    } catch (error) {
      console.log('auth.middleware.js: Token has expired');
      return res.status(401).send('Token has expired');
    }
  }
}

module.exports = AuthMiddleware;
