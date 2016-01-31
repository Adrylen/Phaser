var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Phaser' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Kenneth, ici est la page du jeu' });
});


module.exports = router;
