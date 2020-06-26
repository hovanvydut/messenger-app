const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const firebaseClient = require('../../database/firebase.connection');
const firebaseAdmin = require('../../database/firebaseAdmin.connection');
const knex = require('../../database/knex.connection');

const handleRegisterByEmail = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const currentUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(403).json(errorMessage);
    });

  await knex('users').insert({
    first_name: firstName,
    last_name: lastName,
    email: currentUser.user.email,
  });
  return res.json(req.body);
};

const handleLoginByEmail = async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await firebaseClient
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        return res.status(401).json({ message: 'Wrong password' });
      }
      return res.status(401).json({ message: errorMessage });
    });

  return res.status(200).json(currentUser.user);
};

class AuthController {
  constructor() {}

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

  async handleRegisterByEmail(req, res, next) {
    const { username, email, password } = req.body;

    let userRecord;
    try {
      userRecord = await firebaseAdmin.auth().createUser({
        email,
        emailVerified: false,
        password,
      });
    } catch (error) {
      return res.status(401).send(error.errorInfo.message);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await knex('users').insert({
        id: userRecord.uid,
        username,
        email,
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
    }

    const emailVerificationLink = await firebaseAdmin
      .auth()
      .generateEmailVerificationLink(email);

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      })
    );

    transporter.sendMail({
      from: 'ChatApp', // sender address
      to: email, // list of receivers
      subject: 'Active your account ✔', // Subject line
      text: 'Click link bellow to active your account', // plain text body
      html: `<a>${emailVerificationLink}</a>`, // html body
    });

    return res.status(201).json('OKE NEK');
  }
}

module.exports = {
  handleRegisterByEmail,
  handleLoginByEmail,
  AuthController,
};
