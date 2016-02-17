var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Our Phaser Game' });
});

router.get('/launcher', function(req, res) {
	res.render('launcher', { title: 'Launcher' });
});

/* POST */

router.post('/start_game', function(req, res) {
	res.redirect('users/start');
});

module.exports = router;
