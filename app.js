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


app.get('/home/cart/:id', Controller.cart,verify.isLogin)
app.get('/home/cart', Controller.tampilcart,verify.isLogin)
app.get('/home/cart/delete/:id', Controller.delete,verify.isLogin)
app.get('/checkout', Controller.checkout,verify.isLogin)



app.get('/logout',Controller.logout,verify.isLogout)









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})