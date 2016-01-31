var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('tmp/isometric', {title : 'Essais Isometrics !'});
});

module.exports = router;
