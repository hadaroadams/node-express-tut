
const asyncWrapper =  (fn)=>{
    return async (req,res,next) =>{
        try{
            await fn(req,res,next)
        }catch(erro){
            next(erro)
        }
    }
}

module.exports = {asyncWrapper}