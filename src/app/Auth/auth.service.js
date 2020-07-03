import firebaseAdmin from '../../database/firebaseAdmin.connection.js';
import AuthRepository from './auth.repository.js';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import bcrypt from 'bcrypt';

class AuthService {
  static instance;

  constructor() {
    this.authRepository = AuthRepository.getInstance();
  }

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  loginByEmail(email, password) {
    return this.authRepository.loginByEmail(email, password);
  }

  async registerByEmail(username, email, password) {
    let userRecord;
    try {
      userRecord = await this.authRepository.createUser({
        email,
        emailVerified: false,
        password,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await this.authRepository.insert({
        id: userRecord.uid,
        username,
        email,
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
      throw error;
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
  }

  registerPhone(id, phone) {
    return this.authRepository.insert({ id, phone });
  }
}

export default AuthService;
