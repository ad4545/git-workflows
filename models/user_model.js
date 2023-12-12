const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:false
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String,
    }
})

const User = mongoose.model("user",userSchema)


module.exports = User