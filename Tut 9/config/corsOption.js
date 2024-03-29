const whitelist = ['https://www.google.com','http://127.0.0.1:3500','http://localhost:3500']

const corsOption ={
    origin:(origin,callback)=>{
        console.log(origin)
        if(whitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus:200,
}

module.exports = corsOption