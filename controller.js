const {User,Product}=require('./models')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

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
            // console.log(user);
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
            let {search}=req.query
            let options={}
            if(search){
                options.where={
                    name:{
                        [Op.iLike]: `%${search}%` 
                    }
                }
            }
            let data=await Product.findAll(options)
            // console.log(data);
            res.render('home',{data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async add(req,res){
        try {
            let {error} = req.query
            res.render('formAdd', {error})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async handlerAdd(req,res){
        try {
            let{name,price,image,description}=req.body
            await Product.create({name,price,image,description})
            res.redirect('/home')
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let err = error.errors.map( el => el.message )
                res.redirect(`/home/add?error=${err}`)
            }else{
                console.log(error);
                res.send(error)
            }    
        }
    }
    static async cart(req,res){
        try {
       
            res.render('cart')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

}

module.exports=Controller