'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class TaskAddedUser {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'TaskAddedUser-job'
  }

  // This is where the work is done.
  async handle ({ username, email, title, file }) {
    console.log(`Job: ${TaskAddedUser.key}`)
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
}

module.exports = TaskAddedUser
