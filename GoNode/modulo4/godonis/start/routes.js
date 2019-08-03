'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('user', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgot-password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgot-password', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('file/:id', 'FileController.show')

Route.group(() => {
  Route.post('file', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(
      new Map([
        [['projects.store'], ['ProjectStore']],
        [['projects.update'], ['ProjectUpdate']]
      ])
    )

  Route.resource('project.tasks', 'TaskController')
    .apiOnly()
    .validator(
      new Map([
        [['project.tasks.store'], ['TaskStore']],
        [['project.tasks.update'], ['TaskUpdate']]
      ])
    )
}).middleware(['auth'])
