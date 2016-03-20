var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('tmp/isometric', {title : 'Essais Isometrics !'});
});

router.get('/music', function(req, res) {
	res.render('tmp/webpd', {title : 'Essais WebPd'});
});

module.exports = router;
