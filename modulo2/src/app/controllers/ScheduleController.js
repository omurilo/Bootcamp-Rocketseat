const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .utc()
              .format(),
            moment()
              .endOf('day')
              .utc()
              .format()
          ]
        }
      },
      order: [['date', 'ASC']]
    })
    return res.render('schedule/index', { appointments })
  }
}

module.exports = new ScheduleController()
