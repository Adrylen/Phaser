var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

            /* GET */

router.get('/', function(req, res, next) {
  res.redirect('users/add');
});
router.get('/add', function(req, res, next){
  res.render('users/add', { title : 'Rentre dans nos rangs!'});
})
router.get('/login', function(req, res, next){
  res.render('users/login', { title : 'Reviens coloniser la galaxie!'});
})
router.get('/all', function(req, res) {
  // get all the users
  User.find({ username : 'Arthur'}, function(err, users) {
    if (err) throw err;
    res.render('users/all', {users : users});
  });
});
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.redirect('all');
  })

          /* POST */

router.post('/add', function(req, res){
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });
  res.redirect('all');
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  function(req, res) {
    res.redirect('all');
  });



module.exports = router;
