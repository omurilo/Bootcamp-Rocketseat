const express = require('express')

const routes = express.Router()

const authMiddlware = require('./app/middleware/auth')

const controllers = require('./app/controllers')

routes.get('/teste', authMiddlware, (req, res, next) => res.json({ ok: true }))

routes.post('/users', controllers.UserController.store)
routes.post('/auth', controllers.SessionController.store)

module.exports = routes
