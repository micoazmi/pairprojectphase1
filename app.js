const express = require('express')
const Controller = require('./controller')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', Controller.reg)
app.get('/login', Controller.login)
app.get('/home', Controller.home)
app.get('/formadd', Controller.formAdd)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})