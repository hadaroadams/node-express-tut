const express = require('express');
const router = express.Router();
const path = require('path')
const {createEmployee,getAllEmployees,deleteEmployee,getEmployee,updateEmployee} = require('../../controllers/exployeeController')


router.route('/')
    .get(getAllEmployees)
    .post(createEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);

router.route('/:id')
    .get(getEmployee);

module.exports = router
   
