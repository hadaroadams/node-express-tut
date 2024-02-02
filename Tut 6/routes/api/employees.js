 const express = require('express');
 const router = express.Router();
 const path = require('path')

 const data = {}

 data.employees = require('../../data/emplyees.json')

 router.route('/')
    .get((req,res)=>
        res.json(data.employees)
    )
    .post((req,res)=>{
        res.json({
            "name":req.body.name, 
            "email":req.body.email,
        })
    })
    .patch((req,res)=>{
        res.json({
            "name":req.body.name, 
            "email":req.body.email,
        })
    })
    .delete((req,res)=>{
        res.json({
            "id":req.body.id
        })
    });

router.route('/:id')
    .get((res,req)=>{
        res.json({
            "id" : req.params.id
        })
    });

module.exports = router
   
