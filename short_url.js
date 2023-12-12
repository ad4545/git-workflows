const express = require('express');
const { dbConnect } = require('./db/connection');
const URL_MODEL = require('./models/url');
const app = express();
const routes = require('./routes/routes')
const userRoutes = require('./routes/users')
const path = require('path');
const cookieParser = require('cookie-parser');
const { handleMiddle } = require('./middleware/middle');
const multer = require('multer')


// Upload file configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`sample-${file.originalname}`)
    }
  })

  const upload = multer({storage})




// View engine configuration (Server side rendering)

app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'./views'))



// Database connection
dbConnect().then(()=>console.log('Connected to database'))

// Built-in Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// Routes

// Route-4 : (Server side rendering)


app.get('/sign',(req,res)=>{
    res.render('signup')
})

app.get('/file',(req,res)=>{
    res.render('file')
})

app.post('/upload',upload.single('profile'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.json({message:'file uploaded'})
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/getAll',handleMiddle,(req,res)=>{
    res.render('home')
})
app.use('/user',userRoutes)
app.use('/url',routes)


// Route-2 : To redirect and increase the number of clicks
app.get('/url/:id',async(req,res)=>{
    const id = req.params.id
    const entry = await URL_MODEL.findOneAndUpdate({shortId:id},{$push:{
        visitHistory:{
            timestamp: Date.now()
        }
    }})

    res.redirect(entry.redirectURL)
})

// Description : get the id -> find the entry and update the array of clicks -> send the redirect url as response


// Server Established
app.listen(8000,()=>{
    console.log('Listening to port 8000');
})