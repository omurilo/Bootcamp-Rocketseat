'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    const { page, limit } = request.get()
    const projects = await Project.query()
      .with('user')
      .with('tasks')
      .paginate(page, limit)

    return projects
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description'])

      const project = await Project.create({ ...data, user_id: auth.user.id })

      return project
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.loadMany(['user', 'tasks'])

    return project
  }

  async update ({ params, request }) {
    const data = request.only(['title', 'description'])
    const project = await Project.findOrFail(params.id)

    project.merge(data)

    await project.save()

    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    project.delete()
  }
}

module.exports = ProjectController
