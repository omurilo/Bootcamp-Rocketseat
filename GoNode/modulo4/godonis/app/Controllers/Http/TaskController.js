'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.project_id)
      .with('user')
      .with('file')
      .fetch()

    return tasks
  }

  async store ({ params, request }) {
    const data = request
      .only(['user_id', 'file_id', 'due_date', 'title', 'description'])
    const task = await Task.create({ ...data, project_id: params.project_id })

    await task.loadMany(['user', 'project', 'file'])

    return task
  }

  async show ({ params }) {
    const task = await Task.findOrFail(params.id)

    await task.loadMany(['user', 'file'])

    return task
  }

  async update ({ params, request }) {
    const data = request
      .only(['user_id', 'file_id', 'due_date', 'title', 'description'])
    const task = await Task.findOrFail(params.id)

    task.merge(data)

    await task.save()

    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)

    task.delete()
  }
}

module.exports = TaskController
