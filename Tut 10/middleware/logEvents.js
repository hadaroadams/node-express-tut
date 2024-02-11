// console.log('testing')
const {format}= require('date-fns')
const {v4:uuid} = require('uuid')

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvents = async (message,logFile='eventLog.txt') => {
    const dataTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`
    // console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromise.mkdir(path.join(__dirname,'..','logs'))
        }

        await fsPromise.appendFile(path.join(__dirname,'..','logs',logFile), logItem)
    }catch(error){
        console.log(error)
    }
}

const logger = (req,resp, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next()
}
console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))
console.log(uuid())

module.exports ={logger,logEvents}