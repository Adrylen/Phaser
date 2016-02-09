var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Our Phaser Game' });
});

router.get('/game', function(req, res) {
  res.render('game', { title: 'Kenneth, ici est la page du jeu' });
});

router.get('/launcher', function(req, res) {
	res.render('launcher', { title: 'Launcher' });
});

module.exports = router;
