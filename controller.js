
class Controller{
    static async reg(req,res){
        try {
            res.render('register')
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

}

module.exports=Controller