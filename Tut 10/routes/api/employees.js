const express = require('express');
const router = express.Router();
const path = require('path')
const {createEmployee,getAllEmployees,deleteEmployee,getEmployee,updateEmployee} = require('../../controllers/exployeeController')
const { verify } = require("./../../middleware/verifyJWT")
const verifyRole = require('./../../middleware/verifyRoles')
const {Admin,Editor,user}= require('./../../config/roles_list')


router.route('/')
    .get(getAllEmployees)
    .post(verifyRole(Admin,Editor),createEmployee)
    .patch(verifyRole(Admin,Editor),updateEmployee)
    .delete(verifyRole(Admin),deleteEmployee);

router.route('/:id')
    .get(getEmployee);

module.exports = router
   
