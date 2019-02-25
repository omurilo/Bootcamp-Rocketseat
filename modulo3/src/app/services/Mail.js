const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

const transport = nodemailer.createTransport(mailConfig)

transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials')
    }),
    viewPath,
    extName: '.hbs'
  })
)

module.exports = transport
