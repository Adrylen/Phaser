var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('users/add');
});

router.get('/add', function(req, res, next){
  res.render('users/add', { title : 'Rentre dans nos rang!'});
})

router.post('/addSubmit', function(reg, res, next){
  res.redirect('all');
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
