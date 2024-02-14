const {CustomAPIError,createCustomeError} = require('./../errors/custom-error')

const errohandlerMiddleware =(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(400).json({msg:'something went wrong'})
}

module.exports = errohandlerMiddleware