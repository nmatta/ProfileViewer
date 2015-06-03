'use strict';

var IndexModel = require('../models/index');

//express is required for server-side coding.
var app = require('express')();

//express-session required to maintain the session, look for lib/session-handler.js to understand more on Session handling.
var session = require('express-session');

//DB related connection handling.
 var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {'w':'majority'});
var db = new Db('userDetails', server);

//Verify the DB connection settings....
db.open(function(err, db) {
  if(!err) {
    console.log('Naveen -> DB has connected');
  }
  else{
    console.log('DB not connected');
  }
}); 


//Actual routing logic starts from below.
module.exports = function (router) {

    var model = new IndexModel();

    router.get('/signin', function (req, res, next) {
        res.render('signin', {title: 'Sign in -> Naveen', error: req.query.error, msg: req.query.msg});
    });

    router.post('/signin', function(req, res){
        var name = req.body.name;
        var pwd = req.body.password;

        if((name === 'user') && (pwd === 'password')){
            //setting user session
            req.session = req.session || {};
            req.session.user = 'Naveen Kumar Matta';
            res.redirect('/aboutme');
        } else{
            res.redirect('/signin?error=true');
        }
    });

    router.get('/db', function (req, res) {
           res.redirect('http://www.google.com');
    });

    router.get('/aboutme', function (req, res) {
           res.render('aboutme', {'user': req.session.user, title: 'About -> Naveen'});
    });

    router.get('/education', function(req, res){
        res.render('education', {'user': req.session.user, title: 'Education -> Naveen'});
    });

    router.get('/experience', function(req, res){
        res.render('experience', {'user': req.session.user, title: 'Experience -> Naveen'});
        });

    router.get('/accolades', function(req, res){
       res.render('accolades', {'user': req.session.user, title: 'Accolades -> Naveen'});
    });

    router.get('/certifications', function(req, res){
        res.render('certifications', {'user': req.session.user, title: 'Certifications -> Naveen'});
    });

    router.get('/gallery', function(req, res){
        res.render('gallery', {'user': req.session.user, title: 'Gallery -> Naveen'});
    });

    router.get('/contactme', function(req, res){
        res.render('contactme', {'user': req.session.user, title: 'Contact Me -> Naveen'});
    });

    router.post('/viewFrmDetails', function(req, res){
        res.render('reviewcontact', {'user': req.session.user, 'name': req.body.name, 'email' : req.body.email, 'mobile' : req.body.mobile, 'emailcpy' :  req.body.emailcpy, title: 'Review Details -> Naveen'});
    });

    router.get('/logout', function(req, res){
        delete req.session.user;
        res.redirect('/signin?msg=true');
    });

    router.get('*', function(req, res){
        res.render('errors/404', 404, {title: 'Error -> Naveen'});
    }); 
};