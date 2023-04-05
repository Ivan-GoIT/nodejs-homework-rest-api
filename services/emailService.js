const { convert } = require('html-to-text');
const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');

module.exports = class EmailService {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `do not answer ${process.env.SENDGRID_FORM}`;
  }

  #initTransport() {
    if (process.env.NODE_ENV === 'production')
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_EMAIL_KEY,
        },
      });

    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '87651aa1adc9ef',
        pass: '5c20286b6374eb',
      },
    });
  }

  async #send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: 'do not answer <admin@example.com>',
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    this.#initTransport().sendMail();
  }

  async sendHello() {
    await this.#send('hello ', 'Welcome to our service');
  }

  async sendPasswordResetInstructions() {
    await this.#send('passreset', 'Password reset istructions');
  }
};
