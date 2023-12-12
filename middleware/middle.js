const { getUser } = require("../utls/service")

async function handleMiddle(req,res,next){
     const cookie = req.cookies?.token
     const user = getUser(cookie)
     if(!user) return res.redirect('/login')
     req.user = user
     next()
}


module.exports = {
    handleMiddle
}