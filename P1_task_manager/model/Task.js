const mongoose = require('mongoose')
const {Schema}= mongoose


const taskSchema = new Schema({
     message:{
        type:String,
        require
     },
     marked:{
        type:Boolean,
        require
     },
     time:{
        type:String,
        require
     }
})


module.exports = mongoose.model('Tasks',taskSchema)