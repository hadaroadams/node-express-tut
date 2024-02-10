// const { error } = require('console')
const fs = require('fs')

if(!fs.existsSync('./../Tut 3')){
    fs.mkdir('./../Tut 3',(error)=>{
        if(error) throw error

        console.log('Directory Created')
    })
}else{
    fs.rmdir('./../Tut 3',(error)=>{
        if(error) throw error
        console.log('Directory deleted')
    })
}