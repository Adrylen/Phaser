var express = require('express');
var router = express.Router();
var User = require('../models/user');

            /* GET */

router.get('/', function(req, res, next) {
  res.redirect('users/add');
});
router.get('/add', function(req, res, next){
  res.render('users/add', { title : 'Rentre dans nos rangs!'});
})
router.get('/login', function(req, res, next){
  res.render('users/login', { title : 'Reviens coloniser la galaxie!'});
})
router.get('/all', function(req, res) {
  // get all the users
  User.find({}, function(err, users) {
    if (err) throw err;
    res.render('users/all', {users : users});
  });
});

          /* POST */

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

router.post('/loginSubmit', function(req, res){
  User.find({ username: req.body.username }, function(err, user) {
    if (err) throw err;
    console.log('%s %s', user.username, user.password);
    //console.log(user);
    if(req.body.username == user.username){
      //console.log("it works");
      res.redirect('users/all');
    }else{
      //console.log("it doesn't work");
    }
  });
  res.redirect('all');
})


module.exports = router;
