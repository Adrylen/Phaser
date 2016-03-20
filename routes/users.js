var express = require('express');
var router = express.Router();
var Planet = require('../models/planet');
var User = require('../models/user');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

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
  User.find({}, function(err, users) {
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

router.get('/chat', function(req, res){
  res.render('users/chat', {});
})

router.get('/start',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    if( req.user.solar_system != null) {
      res.redirect('../game');
    }
    res.render('users/start', {user : req.user});
})
          /* POST */

router.post('/add', function(req, res){
  bcrypt.hash(req.body.password, 8, function(err, hash) {
    var newUser = new User({
      username: req.body.username,
      password: hash,
      solar_system: null
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
        res.render('users/add', { title : "Champs incorrectes" });
      }
      res.render('users/login', { title : 'Veuillez vous reconnecter pour valider'});
    });

  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  function(req, res) {
    //console.log(req.user);
    if(req.user.solar_system == null){
      res.redirect('start');
    }
    res.redirect('../game');
  });



module.exports = router;
