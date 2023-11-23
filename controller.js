const {User,Product,discount,Order}=require('./models')
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const formatRp = require('./helper');
const easyinvoice = require('easyinvoice');
const fs = require('fs');


class Controller{
    static async reg(req,res){
        try {
            res.render('register',{   url : 'http://localhost:3000/'})
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
       
            res.render('login',{   url : 'http://localhost:3000/'})
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
            if(error.name === 'SequelizeValidationError'){
                let err = error.errors.map( el => el.message )
                res.redirect(`/home/add?error=${err}`)
            }else{
                console.log(error);
                res.send(error)
            }   

        }
    }
    static async home(req,res){
        try {
            let {search}=req.query
            let options={
                include:discount
            }
            if(search){
                options.where={
                    name:{
                        [Op.iLike]: `%${search}%` 
                    }
                }
            }
            options.order=[['price','DESC']]
            let data=await Product.findAll(options)
            let data3=await discount.findAll()

            // console.log(data);
            res.render('home',{data,formatRp,data3})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async add(req,res){
        try {
            let {error} = req.query
            res.render('formAdd' ,{error})
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
    static async logout(req,res){
        try {
          res.redirect('/login')
            
          
          
        } catch (error) {
           
                console.log(error);
                res.send(error)
            
        }
    }
    static async cart(req,res){
        try {
            let{id}=req.params
            let product = await Product.findByPk(id);
            await Order.create({name:product.name,price:product.price,image:product.image,description:product.description})
            res.redirect('/home')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async tampilcart(req,res){
        try {
            let data = await Order.findAll()
            res.render('cart',{data,formatRp})

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async delete(req,res){
        try {
            
            let{id}=req.params
            console.log(id);
            const result = await Order.destroy({
                where: {
                    id: id
                }
            });
    
            if (result === 0) {
                return res.status(404).send('Order not found');
            }
         res.redirect('/home/cart')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async checkout(req,res){
        try {
            const orders = await Order.findAll();
            const invoiceData = {
                documentTitle: 'Invoice',
                currency: 'USD', // Change this to your preferred currency
                taxNotation: 'vat', // Specify tax notation if applicable
                products: orders.map(order => ({
                    quantity: 1, // You can adjust the quantity based on your needs
                    description: `${order.name} - ${order.description}`,
                    price: order.price
                }))
            };
    
            // Create the invoice as a buffer
            const result = await easyinvoice.createInvoice(invoiceData);
            const pdfBuffer = Buffer.from(result.pdf, 'base64'); // Convert the base64 string to a Buffer
    
            // Set the response headers for download
            res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
    
            // Send the PDF buffer as the response
            res.end(pdfBuffer);
            
         

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
   

}

module.exports=Controller