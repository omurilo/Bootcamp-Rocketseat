'use strict'

const Mail = use('Mail')

class ForgottenPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ForgottenPasswordMail-job'
  }

  // This is where the work is done.
  async handle ({ token, email, name, link }) {
    await Mail.send(
      ['emails.forgot_password'],
      {
        token,
        email,
        name,
        link
      },
      message => {
        message
          .to(email)
          .from('suporte@user.com', 'Murilo Henrique')
          .subject('Recuperação de senha')
      }
    )
  }
}

module.exports = ForgottenPasswordMail
