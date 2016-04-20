var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var Solar = require('../models/solar');
var User = require('../models/user');
var Game = require('../utils/Game.js');

/* GET home page. */

router.get('/', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
    //Game.iWin(req.user._id);
    Game.iWin('pouet');
    console.log('##############################################################');
    console.log(Game);
    res.redirect('game/game');
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  console.log('---------------------------------------------------');
  console.log('              routes/game.js /game');
  console.log('---------------------------------------------------');
  req.user.getSolar(function(solar, authorized){
    if(authorized){
      res.render('game/game', { username: req.user.username, solar_system : solar });
      return;
    }else{
      res.redirect('../users/start');
    }
  });
});

router.get('/win', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
    res.render('game/win', {});
});

module.exports = router;
