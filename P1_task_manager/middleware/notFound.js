const notFound = (req,res)=>{
    return res.status(404).send({msg:`route ${req} not found`})
}

module.exports = notFound