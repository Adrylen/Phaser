var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('users/add');
});

router.get('/add', function(req, res, next){
  res.render('users/add', { title : 'Rentre dans nos rang!'});
})

router.post('/addSubmit', function(req, res){
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });
  res.redirect('all');
})

router.get('/login', function(req, res, next){

})

router.get('/all', function(req, res) {
  // get all the users
  User.find({}, function(err, users) {
    if (err) throw err;
    res.render('users/all', {users : users});
  });


});

module.exports = router;
