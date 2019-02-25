const Mail = require('../services/Mail')

class AcceptMail {
  get key () {
    return 'AcceptMail'
  }

  async handle (job, done) {
    const { ad, purchase } = job.data

    await Mail.sendMail({
      from: `"${ad.author.name}" <${ad.author.email}>`,
      to: `"${purchase.buyer.name}" <${purchase.buyer.email}>`,
      subject: `Solicitação de compra aceita: ${ad.title}`,
      template: 'accept',
      context: { ad, purchase }
    })

    return done()
  }
}

module.exports = new AcceptMail()
