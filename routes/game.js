var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

/* GET home page. */

router.get('/', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  res.redirect('game/game');
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  res.render('game/game', { title: 'Kenneth, ici est la page du jeu' });
});

module.exports = router;