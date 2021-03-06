var express = require('express');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongo = require('mongodb');
var passport = require('passport');
var mongoose = require('mongoose');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var host = process.env.VCAP_APP_HOST || process.env.HOST || '0.0.0.0';
var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/erkma');

var db = mongoose.connection;
var Schema = mongoose.Schema;

//    models
var modelSP = require('./models/modelSP');
var User = modelSP.User;
var Game = require('./utils/Game');


//    routes
var game = require('./routes/game');
var routes = require('./routes/index');
var tmp = require('./routes/tmp');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

//  Configure type of connection
passport.use(new Strategy(
  function(username, password, cb) {
    User.find({ username : username }, function(err, user) {
      if (err) return cb(err);
      if (!user[0]){
        return cb(null, false);
      }
      bcrypt.compare(password, user[0].password, function(err, res) {
        if(res == true){
          return cb(null, user[0]);
        }else{
          return cb(null, false);
        }
      });
    });
  }));
// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.find({ _id : id }, function(err, user){
    //console.log(JSON.stringify(user,null, 4));
    if (err) { return cb(err); }
    cb(null, user[0]);
  })
});


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/game', game);
app.use('/tmp', tmp);

  //          Start
Game.prototype.initialize(io);

//            Game update ressources from mongo
Game.prototype.sendData(io);
var a;
function realTime(){
  a = setInterval(Game.prototype.updateGames, 1000);
}
//          Update data
realTime();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


http.listen({
  host: host,
  port: port
}, function(){
  console.log('-----------------------------------');
  console.log('   listening on *:' + port);
  console.log('-----------------------------------');
});

module.exports = app;
