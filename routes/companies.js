const express = require("express");
const router = express.Router();
const Company = require('../model/company');

//Getting info by Course
router.get('/',async(req,res) => {
    let searchOptions = {}
    if(req.query.course != null && req.query.course !== '') {
        searchOptions.course = new RegExp(req.query.course, 'i')
    }
    try{
        const companies = await Company.find(searchOptions)
        res.json(companies)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


// Getting all
router.get('/',async(req,res) => {
    try{
        const companies = await Company.find()
        res.json(companies)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting one
router.get('/:id',getCompany, async (req,res) => {
    res.send([res.company.company_name,res.company.company_address])

})
// Creating one
router.post('/', async (req,res) => {
    const company = new Company({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        course: req.body.course,
    })
    try{
        const newCompany = await company.save()
        res.status(201).json(newCompany)
    }catch(err){
     res.status(400).json({message: err.message})   
    }
})

// Updating one
router.patch('/:id',getCompany,async(req,res) => {
    if(req.body.company_name != null){
        res.company.company_name = req.body.company_name
    }
    if(req.body.company_address!= null){
        res.company.company_address = req.body.company_address
    }
    if(req.body.course!= null){
        res.company.course = req.body.course
    }
    try{
        const updatedCompany =  await res.company.save()
        res.json(updatedCompany)
    }catch(err){    
        res.status(400).json({message: err.message})

    }
})

async function getCompany(req, res, next){
    let company
    try{
        company = await Company.findById(req.params.id) 
        if(company == null){
        return res.status(404).json({message:'Cannot Find Company'})
        }
    } catch (err){
        return res.status(500).json({message: 'error' })
    } 

    res.company = company
    next()
}
 


module.exports = router;