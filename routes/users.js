var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('users/add');
});

router.get('/add', function(req, res, next){
  res.render('users/add', { title : 'Rentre dans nos rang!'});
})

router.post('/addSubmit', function(req, res){
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
        // And forward to success page
        res.redirect('all');
      }
  });
})

router.get('/login', function(req, res, next){

})

router.get('/all', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
        res.render('users/all', {
                "userlist" : docs
            });
       });
});

module.exports = router;
