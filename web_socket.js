const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')


const server = http.createServer(app)

const io = new Server(server)

io.on('connection',(socket)=>{
    socket.on('user-message',(message)=>{
        io.emit('message',message)
    })
})


app.use(express.static('static'))

app.get('/',(req,res)=>{
    res.sendFile('./static/index.html')
})

server.listen(8000,()=> console.log('server started'))