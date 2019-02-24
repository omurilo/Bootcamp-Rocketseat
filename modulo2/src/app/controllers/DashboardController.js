const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const date = moment()
    const userId = req.session.user.id
    const appointments = await Appointment.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.gte]: [date.startOf('day').format()]
        }
      }
    })
    const appointmentsUser = []
    appointments.forEach(appointment => {
      providers.forEach(provider => {
        if (appointment.provider_id === provider.id) {
          appointmentsUser.push({
            date: moment(appointment.date).format('DD/MM/YY'),
            hour: moment(appointment.date).format('HH:mm'),
            provider: provider.name,
            avatar: provider.avatar
          })
        }
      })
    })
    return res.render('dashboard', {
      providers,
      appointmentsUser
    })
  }
}

module.exports = new DashboardController()
