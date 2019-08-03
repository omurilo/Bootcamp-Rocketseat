'use strict'

const TaskHook = exports = module.exports = {}
const Kue = use('Kue')
const Job = use('App/Jobs/TaskAddedUser')

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if ((!taskInstance.user_id && !taskInstance.dirty.user_id) ||
  (!taskInstance.dirty.user_id && taskInstance.user_id)) return

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  Kue.dispatch(Job.key,
    { email, username, file, title },
    {
      attempts: 3
    })
}
