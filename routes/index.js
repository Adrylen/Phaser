var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Our Phaser Game' });
});

router.get('/game', require('connect-ensure-login').ensureLoggedIn('users/login'), function(req, res){
  res.render('game', { title: 'Kenneth, ici est la page du jeu' });
});

router.get('/launcher', function(req, res) {
	res.render('launcher', { title: 'Launcher' });
});

/* POST */

router.post('/start_game', function(req, res) {
  if(req.user.solar_system == 'void') {
    res.redirect('start');
  }
	res.redirect('game');
});

module.exports = router;
