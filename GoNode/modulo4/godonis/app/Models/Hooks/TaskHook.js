'use strict'

const TaskHook = exports = module.exports = {}
const Mail = use('Mail')
const Helpers = use('Helpers')

// create not set user => undefined undefined
// update with not user setted => number undefined
// update with user setted => number number

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if ((!taskInstance.user_id && !taskInstance.dirty.user_id) ||
  (!taskInstance.dirty.user_id && taskInstance.user_id)) return

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  await Mail.send(
    ['emails.task_added_user'],
    {
      name: username,
      title,
      hasAttachment: !!file
    },
    message => {
      message
        .to(email)
        .from('suporte@user.com', 'Murilo Henrique')
        .subject('Uma tarefa foi vinculada à você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
