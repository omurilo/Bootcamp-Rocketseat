'use strict'

const Antl = use('Antl')

class TaskStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description: 'string',
      due_date: 'date',
      file_id: 'integer',
      title: 'required|string',
      user_id: 'integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = TaskStore
