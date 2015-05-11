'use strict';


var IndexModel = require('../models/index');
var app = require('express')();
var session = require("express-session");


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res){

        res.render('signin', {error: req.query.error, 'user': req.session.user});}
    ); 

    router.get('/signin', function (req, res, next) {
       res.render('signin', {error: req.query.error, 'user': req.session.user});
    });

    router.post('/signin', function(req, res){
        var name = req.body.name;
        var pwd = req.body.password;
        
        if((name === 'nmatta') && (pwd === 'pranav')){
            //setting user session
            req.session = req.session || {};
            req.session.user = "Naveen Kumar Matta";
            res.redirect('/aboutme');
        } else{
            res.redirect('/?error=true');
        }
    });

    router.get('/aboutme', function (req, res) {
        res.render('index', {'user': req.session.user});
    });

   router.get('/education', function(req, res){
        res.render('education', {'user': req.session.user});
    });

    router.get('/experience', function(req, res){
        res.render('experience', {'user': req.session.user});
        });

    router.get('/accolades', function(req, res){
       res.render('accolades', {'user': req.session.user});
    });

    router.get('/certifications', function(req, res){
        res.render('certifications', {'user': req.session.user});
    });

    router.get('/gallery', function(req, res){
        res.render('gallery', {'user': req.session.user});
    });

    router.get('/contactme', function(req, res){
        res.render('contactme', {'user': req.session.user});
});

    router.post('/viewFrmDetails', function(req, res){
        res.render('reviewcontact', {'user': req.session.user, 'name': req.body.name, 'email' : req.body.email, 'mobile' : req.body.mobile, 'emailcpy' :  req.body.emailcpy});
    });

    router.get('/logout', function(req, res){
        delete req.session.user;
        res.redirect('/signin');
    });


    router.get('*', function(req, res){
        res.render('errors/404', 404);
    }); 

 };
