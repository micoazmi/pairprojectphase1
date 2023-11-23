const {User,Product}=require('./models')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verify = require('./verify');

class Controller{
    static async reg(req,res){
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async handleReg(req,res){
        try {
            const salt = await bcrypt.genSalt(10);
            var usr = {
                name : req.body.name,
                email : req.body.email,
                password : await bcrypt.hash(req.body.password, salt)
              };
            await User.create(usr)
           
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async login(req,res){
        try {
       
            res.render('login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async handleLogin(req,res){
        try {
            const user = await User.findOne({ where : {email : req.body.email }});
            if(user){
            const password_valid = await bcrypt.compare(req.body.password,user.password);
            if(password_valid){
                res.redirect('/home')
            } else {
            res.status(400).json({ error : "Password Incorrect" });
            }
  
    }else{
    res.status(404).json({ error : "User does not exist" });
    }
   
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async home(req,res){
        try {
            let data=await Product.findAll()
            // console.log(data);
            res.render('home',{data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async add(req,res){
        try {
   
            res.render('formAdd')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

}

module.exports=Controller