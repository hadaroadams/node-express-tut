const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?',(req,resp)=>{
    // resp.sendFile('./views/index.html',{root:__dirname}'..',)
    
    resp.sendFile(path.join(__dirname,'..','views','index.html'))
})

router.get('/newPage(.html)?',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'..','views','newPage.html'))
})

router.get('/oldPage(.html)?',(req,resp)=>{
    resp.redirect(301,'/newPage.html')
})


module.exports= router