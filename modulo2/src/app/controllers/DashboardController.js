const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const users = await User.findAll({ where: { provider: false } })
    const date = moment()
    const userId = req.session.user.id
    const appointments = await Appointment.findAll({
      where: {
        date: {
          [Op.gte]: [date.startOf('day').format()]
        }
      }
    })
    const appointmentsUser = []
    const appointmentsProvider = []
    appointments.forEach(appointment => {
      providers.forEach(provider => {
        if (
          appointment.provider_id === provider.id &&
          appointment.user_id === userId
        ) {
          appointmentsUser.push({
            date: moment(appointment.date).format('DD/MM/YY'),
            hour: moment(appointment.date).format('HH:mm'),
            provider: provider.name,
            avatar: provider.avatar
          })
        }
      })
      /* forEach para pegar os usuário que existem cadastrados para aquele provider */
      users.forEach(user => {
        if (
          appointment.provider_id === userId &&
          appointment.user_id === user.id
        ) {
          appointmentsProvider.push({
            date: moment(appointment.date).format('DD/MM/YY'),
            hour: moment(appointment.date).format('HH:mm'),
            user: user.name,
            avatar: user.avatar
          })
        }
      })
    })
    return res.render('dashboard', {
      providers,
      appointmentsUser,
      appointmentsProvider
    })
  }
}

module.exports = new DashboardController()
