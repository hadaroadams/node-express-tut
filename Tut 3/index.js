const {add,logEvents} = require('./logEvents.js')

console.log("import",add(2,3))

const EventEmmitter = require('events')

// console.log(EventEmmitter)

class MyEmitter extends EventEmmitter{}
const myEmitter = new MyEmitter()

myEmitter.on('log',(mes) => logEvents(mes))

setTimeout(()=>{
    myEmitter.emit('log','log event emmitted')
    // logEvents()
},2000)