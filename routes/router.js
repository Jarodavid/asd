const express = require("express");

module.exports =function(app){
    var coursesController = require('../controller/CoursesController');

    //var apiRoutes = express.Router();

    app.get('/get', function(req,res){
        res.send('We are happy to see you using Chat Bot Webhook');
    });

    app.route('/')
        .post(coursesController.processRequest);
};