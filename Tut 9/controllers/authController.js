const userDB={
    users:require('./../model/users.json'),
    setUsers: function (data){
        this.users=data
    }
}

const fsPromise = require('fs').promises
const path = require('path')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const handleLogIn=async(req,res)=>{
    const {user,pwd} = req.body
    if(!user||!pwd) return res.status(400).json({'message':"Username and password are required"});
    console.log(req.body)

    const isUserExiting = userDB.users.find((person)=>person.userName===user)
    if(!isUserExiting) return res.sendStatus(401)
    
        const isMatch = await bcrypt.compare(pwd,isUserExiting.password)
        if(isMatch){
            // Create jwts
            const accessToken = jwt.sign(
                {"username":isUserExiting.userName},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            const refeshToken = jwt.sign(
                {"username":isUserExiting.userName},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            );
            // console.log(accessToken,refeshToken)
            const otherUsers = userDB.users.filter((person)=>person.userName!==isUserExiting.userName)
            const currentUser= {...isUserExiting,refeshToken}
            userDB.setUsers(([...otherUsers,currentUser]))
            await fsPromise.writeFile(path.join(__dirname,"..",'model',"users.json"),JSON.stringify(userDB.users))
            res.cookie("jwt",refeshToken,{httpOnly:true,maxAge:24*60*60*1000})
            res.json({accessToken })
        }else{
            res.sendStatus(401)
        }
}

module.exports= {handleLogIn}