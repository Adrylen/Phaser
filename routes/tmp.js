var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('tmp/isometric', {title : 'Essais Isometrics !'});
});

router.get('/music', function(req, res) {
	res.render('tmp/webpd', {title : 'Essais WebPd'});
});

router.get('/notifs', function(req, res) {
	res.render('tmp/notifications', {title: 'Notifications'});
});

module.exports = router;
