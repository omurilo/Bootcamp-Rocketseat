const Ad = require('../models/Ad')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')
const AcceptMail = require('../jobs/AcceptMail')

class ApproveController {
  async update (req, res) {
    const { ad, accept } = req.body

    const approve = await Ad.findOne({ _id: ad }).populate('author', [
      'name',
      'email'
    ])

    const purchase = await Purchase.findOneAndUpdate(
      { _id: req.params.id },
      {
        accept
      },
      { new: true }
    ).populate('buyer', ['name', 'email'])

    if (!approve.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the ad author" })
    }

    if (approve.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This ad had already been purchased' })
    }

    approve.purchasedBy = req.params.id

    await approve.save()

    // Queue para enviar email da compra aceita
    Queue.create(AcceptMail.key, {
      ad: approve,
      purchase
    }).save()

    return res.json(purchase)
  }
}

module.exports = new ApproveController()
