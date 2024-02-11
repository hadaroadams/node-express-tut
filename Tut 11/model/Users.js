const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    userName:{
        type:String,
        require:true
    },
    roles:{
        user:{
            type:Number,
            default:2
        },
        Editor:Number,
        Admin:Number

    },
    password:{
        type:String,
        require
    },
    refreshToken:String
})

module.exports = mongoose.model("Users",userSchema)