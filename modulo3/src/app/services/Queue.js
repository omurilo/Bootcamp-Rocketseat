const kue = require('kue')
const Sentry = require('@sentry/node')
const jobs = require('../jobs')
const redisConfig = require('../../config/redis')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)
Queue.process(jobs.AcceptMail.key, jobs.AcceptMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
