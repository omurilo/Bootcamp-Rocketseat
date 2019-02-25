const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { user, content, ad } = job.data

    await Mail.sendMail({
      from: '"Murilo Henrique" <oofleaoo@xpory.com>',
      to: `"${ad.author.name}" <${ad.author.email}>`,
      subject: `Solicitacao de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
