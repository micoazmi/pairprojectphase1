const express = require('express')
const Controller = require('./controller')
const verify = require('./verify')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))


app.get('/', Controller.reg,verify.isLogout)
app.post('/register',Controller.handleReg,verify.isLogout)

app.get('/login', Controller.login,verify.isLogout)
app.post('/login', Controller.handleLogin,verify.isLogin)

app.get('/home',Controller.home,verify.isLogin)

app.get('/home/add',Controller.add,verify.isLogin)
app.post('/home/add',Controller.handlerAdd,verify.isLogin)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})