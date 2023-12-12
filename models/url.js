const mongoose = require('mongoose')


const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
   
}, {timestamp:true})


const URL_MODEL = mongoose.model('url_model',urlSchema)

module.exports = URL_MODEL