const express = require('express')
const Router = express.Router()
const path = require('path')

Router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views",'index.html'))
})

Router.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","about.html"))
})


module.exports = Router

