class  CustomAPIError extends Error{
    constructor(message,statusCode){
        super(message),
        this.statusCode=statusCode
    }
}

const createCustomeError=(mes,statusCode)=>{
    return new CustomAPIError(mes,statusCode)
}

module.exports = {CustomAPIError,createCustomeError}