const mongoose= require('mongoose')
const {Schema} = mongoose

const emplyeeSchema = new Schema({
    name:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    }
})

module.exports = mongoose.model("Employee",emplyeeSchema)