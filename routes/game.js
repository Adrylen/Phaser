var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var modelSP = require('../models/modelSP');
var Game = require('../utils/Game.js');

/* GET home page. */

router.get('/', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  console.log(req.user._id);
  //console.log(Game.prototype.iWin(req.user._id));
  res.redirect('game/game');
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
  req.user.getSolar(function(solar, authorized){
    if(authorized){
      console.log('req.user.username', req.user.username);
      console.log('solar', solar);
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

router.get('/end', require('connect-ensure-login').ensureLoggedIn('../users/login'), function(req, res){
    res.render('game/End', {});
});

module.exports = router;
