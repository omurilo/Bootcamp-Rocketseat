'use strict'

const Mail = use('Mail')

class ResetPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ResetPasswordMail-job'
  }

  // This is where the work is done.
  async handle ({ email, name }) {
    await Mail.send(
      ['emails.reset_password'],
      {
        email,
        name
      },
      message => {
        message
          .to(email)
          .from('suporte@user.com', 'Murilo Henrique')
          .subject('Alteração de senha')
      }
    )
  }
}

module.exports = ResetPasswordMail
