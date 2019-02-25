const Ad = require('../models/Ad')
const User = require('../models/User')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const user = await User.findById(req.userId)

    const purchaseAd = await Ad.findById(ad).populate('author', [
      'name',
      'email'
    ])

    if (purchaseAd.purchasedBy) {
      return res.status(401).json({ error: 'This ad as already purchased' })
    }

    if (!purchaseAd.purchasedBy) {
      const purchase = await Purchase.create({ buyer: user.id, ad })

      Queue.create(PurchaseMail.key, {
        ad: purchaseAd,
        user,
        content,
        purchase
      }).save()
    }

    return res.json(purchaseAd)
  }
}

module.exports = new PurchaseController()
