'use strict'

const Antl = use('Antl')

class ProjectStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description: 'required|string',
      title: 'required|string'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ProjectStore
