const express = require('express')
const app = express()
// const users = require('./MOCK_DATA.json')
const User = require('./models/user_model')
const fs = require('fs')
const mongoose = require('mongoose')


// Connection

mongoose.connect('mongodb://127.0.0.1:27017/app').then(()=> console.log('MongoDb connected')).catch((err)=> console.log(err))

// Middleware

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    fs.appendFile('./log.txt',`\n ${Date.now()}: ${req.method}- ${req.path}`,(err,data)=>{})
    next();
})

// Rest Api

app.get('/api/users',async(req,res)=>{
    res.setHeader('x-poll','none')  //headers
    const users = await User.find({})
    res.json(users)
})
app.get('/api/users/:id',async(req,res)=>{
    const first_name = req.params.id
    const user = await User.find({first_name})
    res.json(user)
})
app.post('/api/users',async(req,res)=>{
    const body = req.body
    users.push({...body,id:users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    })
    const {first_name,last_name,email,gender,job_title} = body
    const result =  await User.create({
        first_name,
        last_name,
        email,
        gender,
        job_title
    })

    res.status(201).json({message:'success'})
   
})
app.patch('/api/users/:id',async(req,res)=>{
     const body = req.body
     const id = Number(req.params.id)
    //  const updateUser = users.find((item)=> item.id==id)
    //  const index = users.indexOf(updateUser)
    //  console.log(index);
    //  users[index].first_name=body.first_name
    //  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     res.json({message:'Success'})
    //  })
    await User.findByIdAndUpdate(id,{last_name:'Changed'})
    res.status(201).json({message:'success'})
})
app.delete('/api/users/:id',(req,res)=>{
    const id = (req.params.id)
    const newUsers = users.filter((item)=> item.id!=id)
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(newUsers),(err,data)=>{
        res.json({message:'Success'})
    })
})





app.listen(8000,()=> console.log('Listening to port 8000'))