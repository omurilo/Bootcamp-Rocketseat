'use strict'

const Antl = use('Antl')

class ProjectUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description: 'string',
      title: 'string'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ProjectUpdate
