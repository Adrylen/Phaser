var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var Solar = require('../models/solar');
var User = require('../models/user');

/* GET home page. */

router.get('/', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  res.redirect('game/game');
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  console.log('---------------------------------------------------');
  console.log('              routes/game.js /game');
  console.log('---------------------------------------------------');
  req.user.getSolar(function(solar){
    console.log(JSON.stringify(solar, null, 4));
    console.log('Stackanoviste pour la vie');
    res.render('game/game', { username: req.user.username, solar_system : solar });
  });
  console.log('                      Staliniste pour la vie!');
});

module.exports = router;
