const userDB={
    users:require('./../model/users.json'),
    setUsers: function (data){
        this.users=data
    }
}

const fsPromise = require('fs').promises
const path = require('path')
const bcrypt= require('bcrypt')

const handleLogIn=async(req,res)=>{
    const {user,pwd} = req.body
    if(!user||!pwd) return res.status(400).json({'message':"Username and password are required"});

    const isUserExiting = userDB.users.find((person)=>person.userName===user)
    if(!isUserExiting) return res.sendStatus(401)
    
        const isMatch = await bcrypt.compare(pwd,isUserExiting.password)
        if(isMatch){
            res.json({'success':`User ${user} is logged in`})
        }else{
            res.sendStatus(401)
        }
}

module.exports= {handleLogIn}