const UserModel = require("../models/user")
const { setUser } = require("../utls/service")


async function handleUserSign(req,res){
    const {name,email,password} = req.body
    await UserModel.create({
        name,
        email,
        password
    })
    res.render('home')

}
async function handleUserLogin(req,res){
    const {email,password} = req.body
    const user = await UserModel.findOne({email,password})
    if(!user){
        res.render('login',{
            error:'Invalid Credentials'
        })
    }
    const token = setUser(user)
    res.cookie('token',token)
    res.redirect('/getAll')

}

module.exports={
    handleUserSign,
    handleUserLogin
}