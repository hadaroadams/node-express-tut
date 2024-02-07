const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger}= require('./middleware/logEvents')
const {errorHandler} = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOption')
const {verify} = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500;


//custom middleWare logger

app.use(logger)

//cors cross origin resource sharing

app.use(cors(corsOptions))
 
app.use(express.urlencoded({extended:false}))

app.use(express.json())

//middleware for cookies
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'/public')) )
app.use('/subDir',express.static(path.join(__dirname,'/public')) )

//routes
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))

app.use(verify)

//Api creation
app.use( '/employees' , require('./routes/api/employees') );
 

// app.all('*',(req,resp)=>{
//     resp.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })

// Rout handlers 
app.use(errorHandler)

app.listen(PORT,()=>console.log(`server runnig on port ${PORT}`))