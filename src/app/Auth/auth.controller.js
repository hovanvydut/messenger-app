const AuthService = require('./auth.service');

class AuthController {
  static instance;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  viewLogin(req, res) {
    return res.render('app/login');
  }

  viewRegister(req, res) {
    return res.render('app/auth/register');
  }

  viewRegisterByEmail(req, res) {
    return res.render('app/auth/register-email');
  }

  viewSignOut(req, res) {
    return res.render('app/sign-out');
  }

  viewRegisterByPhone(req, res) {
    return res.render('app/login-phone-number');
  }

  async handleRegisterByEmail(req, res) {
    const { username, email, password } = req.body;
    try {
      await this.authService.registerByEmail(username, email, password);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json('OKE NEK');
  }

  async handleLoginByEmail(req, res) {
    const { email, password } = req.body;
    let currentUser;
    let token;

    try {
      currentUser = await this.authService.loginByEmail(email, password);
      token = await currentUser.user.getIdToken();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(200).json({ token });
  }

  async registerPhone(req, res) {
    const { phone, id } = req.body;
    console.log(phone);
    try {
      await this.authService.registerPhone(id, phone);
      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      if (error.code == '23505') {
        return res.status(200).json({ message: 'OK' });
      }
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
