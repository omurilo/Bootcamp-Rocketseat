if (process.env.NODE_ENV !== 'development') {
  module.exports = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  }
} else {
  module.exports = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: '9294efd39f7748',
      pass: '8e09eb606a7e32'
    }
  }
}
