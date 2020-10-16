'use strict';

const company = require('../model/company');

exports.processRequest = function(req,res){
    if(req.body.result.action == "companies"){
        getCompanies(req,res)
    }
    else{
        res.send("error")
    }
}

async function getCompanies(req,res)
{
    let parameters = req.body.result.parameters;
    let specificCourse = parameters.company_course;
    if (req.query.course != null && req.query.course !== '')
    {
        specificCourse = new RegExp(req.query.course,'i')
    }
    try {
        const companies = await (await company.find({course: specificCourse},{company_name: 1})).toString({})
        res.json(companies)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}