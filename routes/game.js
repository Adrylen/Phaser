var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

/* GET home page. */

router.get('/', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  res.redirect('game/game');
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  //console.log(JSON.stringify(req.user, null, 4));
  res.render('game/game', { username: req.user.username, solar_system : req.user.solar_system });
});

module.exports = router;
