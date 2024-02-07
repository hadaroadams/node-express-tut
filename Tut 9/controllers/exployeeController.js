 const data = {
    employees: require('./../model/emplyees.json'),
    setEmployee:function(data1){
        this.employees = data1
        }
 }
//  data.employees = require('../model/emplyees.json')



const getAllEmployees= (req,resp) =>{
    resp.json(data.employees)
}

const createEmployee=(req,res)=>{

    const newEmployee = {
        id:data.employees[data.employees.length-1].id+1 || 1,
        name:req.body.name,
        email:req.body.email,
    }

    console.log(newEmployee)

    if(!newEmployee.name||!newEmployee.email){
        return res.status(400).json({'messaga':'name and email is required.'})
    }
    const newdata = [...data.employees,newEmployee]
    data.setEmployee(newdata)
    // data.employees=[...data.employees,newEmployee]
    // console.log(data)
    res.status(201).json(data.employees)
}

const updateEmployee = (req,res)=>{
    const employee = data.employees.find((emp)=>emp.id===parseInt(req.body.id))

    if(!employee){
       return res.status(400).json({"message" : `Employee with ID ${req.body.id} not found`})
    }
    if(req.body.name)employee.name = req.body.name
    if(req.body.email)employee.email = req.body.email

    const filterdArray = data.employees.filter((emp)=>emp.id!==employee.id)
    const unsortedArray =[...filterdArray,employee]
    data.setEmployee(unsortedArray.sort((a,b)=>a.id - b.id))
    res.json(data.employees)
}

const deleteEmployee=(req,res)=>{
    const employee = data.employees.find((emp)=>emp.id===parseInt(req.body.id))

    if(!employee){
       return res.status(400).json({"message" : `Employee with ID ${req.body.id} not found`})
    }
    const filterdArray = data.employees.filter((emp)=>emp.id!==employee.id)
    data.setEmployee([...filterdArray])
    res.json(data.employees)
}

const getEmployee=(req,res)=>{
    console.log(req.params.id)
        const employee = data.employees.find(emp=>emp.id===parseInt(req.params.id))
        if(!employee){
            return res.status(400).json({"message" : `Employee with ID ${req.params.id} not found`})
        }
        res.json(employee)
}

module.exports={getAllEmployees,deleteEmployee,getEmployee,updateEmployee,createEmployee}