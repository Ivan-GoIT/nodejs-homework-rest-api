const { convert } = require('html-to-text');
const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');

module.exports = class EmailService {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `do not answer <${process.env.SENDGRID_FROM}>`;
  }

  #initTransport() {
    if (process.env.NODE_ENV === 'development')
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
      });

    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async #send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
      {
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    this.#initTransport().sendMail(emailConfig);
  }

  async sendHello() {
    await this.#send('hello', 'Welcome to our service');
  }
};
