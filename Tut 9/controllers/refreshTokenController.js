const userDB={
    users:require('./../model/users.json'),
    setUsers: function (data){
        this.users=data
    }
}
const jwt = require('jsonwebtoken')
require("dotenv").config()

const handleRefresh = (req,res) => {
    const cookies = req.cookies
    console.log(req)
    if(!cookies?.jwt) return res.status(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;
    const isUserExiting = userDB.users.find((person)=>person.refeshToken===refreshToken)
    if(!isUserExiting) return res.sendStatus(403) // forbidden
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode)=>{
            if(err || isUserExiting.userName!== decode.username) return res.sendStatus(403)

            const accessToken = jwt.sign(
                {"username":decode.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'},
            );
            res.json({accessToken})
        }
    )
            
        
}

module.exports= {handleRefresh}