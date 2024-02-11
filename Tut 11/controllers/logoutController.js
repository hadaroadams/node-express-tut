const userDB={
    users:require('./../model/users.json'),
    setUsers: function (data){
        this.users=data
    }
}
const fsPromise =require('fs').promises
const path = require('path')

const handleLogout = async(req , res) => {
    //On Client, also delet the accesToken

    const cookies = req.cookies
    
    console.log("made it her")
    if(!cookies.jwt) return res.sendStatus(204)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;
    // is ref
    const isUserExiting = userDB.users.find((person)=>person.refeshToken===refreshToken)
    if(!isUserExiting){
        res.clearCookies('jwt',{httpOnly:true})
        return res.sendStatus(204) // forbidden
    } 
    const otherUsers = userDB.users.filter((person)=>isUserExiting.refeshToken!==person.refeshToken)

    const currentUser = [...otherUsers,refreshToken='']
    userDB.setUsers([...otherUsers,currentUser]);
    await fsPromise.writeFile(path.join(__dirname,"..","model",'users.json'),JSON.stringify(userDB.users))
     
    res.clearCookies('jwt',{httpOnly:true,sameSite:'None',secure:true })
    res.sendStatus(204)     
        
}

module.exports = {handleLogout}