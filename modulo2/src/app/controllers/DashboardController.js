const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const userId = req.session.user.id
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'provider' }],
      where: {
        user_id: userId,
        date: {
          [Op.gte]: [
            moment()
              .startOf('day')
              .format()
          ]
        }
      },
      order: [['date', 'ASC']]
    })

    return res.render('dashboard', {
      providers,
      appointments
    })
  }
}

module.exports = new DashboardController()
