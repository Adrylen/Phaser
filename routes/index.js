var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Our Phaser Game' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Kenneth, ici est la page du jeu' });
});


module.exports = router;
