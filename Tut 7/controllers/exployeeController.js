 const data = {}
 data.employees = require('../model/emplyees.json')


const getAllEmployees=(req,resp)=>{
    resp.json(data.employees)
}

const createEmployee=(req,res)=>{
    res.json({
        "name":req.body.name, 
        "email":req.body.email,
    })
}

const updateEmployee =(req,res)=>{
    res.json({
        "name":req.body.name, 
        "email":req.body.email,
    })
}

const deleteEmployee=(req,res)=>{
    res.json({
        "id":req.body.id
    })
}

const getEmployee=(res,req)=>{
        res.json({
            "id" : req.params.id
        })
}

module.exports={getAllEmployees,deleteEmployee,getEmployee,updateEmployee,createEmployee}