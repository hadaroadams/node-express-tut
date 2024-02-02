const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger}= require('./middleware/logEvents')
const {errorHandler} = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


//custom middleWare logger

app.use(logger)

//cors cross origin resource sharing

const whitelist = ['https://www.google.com','http://127.0.0.1:3500','http://localhost:3500']

const corsOption ={
    origin:(origin,callback)=>{
        console.log(origin)
        if(whitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus:200,
}

app.use(cors(corsOption))
 
app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(express.static(path.join(__dirname,'/public')) )
app.use('/subDir',express.static(path.join(__dirname,'/public')) )

// app.get('/index(.html)?',(req,resp)=>{
//     resp.sendFile(path.join(__dirname,'views','subdir','index.html'))
// })

app.use('/',require('./routes/root'))
app.use( '/subdir' , require('./routes/subDir') );
//Api creation
app.use( '/employees' , require('./routes/api/employees') );
 

app.all('*',(req,resp)=>{
    resp.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

// Rout handlers 
app.use(errorHandler)

app.listen(PORT,()=>console.log(`server runnig on port ${PORT}`))