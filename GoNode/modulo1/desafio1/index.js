const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checaIdade = (req, res, next) => {
  if (!req.query.idade) return res.redirect('/')

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major/?idade=${age}`)
  } else {
    return res.redirect(`/minor/?idade=${age}`)
  }
})

app.get('/minor', checaIdade, (req, res) => {
  const age = req.query.idade
  return res.render('minor', { age })
})

app.get('/major', checaIdade, (req, res) => {
  const age = req.query.idade
  return res.render('major', { age })
})

app.listen(3000)
