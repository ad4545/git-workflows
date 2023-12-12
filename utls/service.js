const jwt = require('jsonwebtoken')


function setUser(user){
    const payload = {
        ...user
    }
    return jwt.sign(payload,'farmer')
}

function getUser(token){
    if(!token) return null
    return jwt.verify(token,'farmer')
}

module.exports = {
    setUser,getUser
}