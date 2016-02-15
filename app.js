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

var User = require('./models/user');

var host = process.env.VCAP_APP_HOST || process.env.HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/erkma');

var db = mongoose.connection;
var Schema = mongoose.Schema;


var routes = require('./routes/index');
var users = require('./routes/users');
var tmp = require('./routes/tmp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});



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
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.find({ _id : id }, function(err, user){
    console.log('bazzinga');
    console.log(JSON.stringify(user,null, 4));
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
app.use('/tmp', tmp);

var usernames = [];
io.on('connection', function(socket){

  socket.on('start', function(username){

    usernames.push(username);

    socket.emit('start connected', usernames);
    socket.broadcast.emit('start connected', usernames);

    socket.on('disconnect', function(){
      usernames = [];
      socket.broadcast.emit('user disconnected');
    })
    if(usernames.length == 2) {
      socket.emit('start ready');
      socket.broadcast.emit('start ready');

      var alphabet = "abcdefghijklmnopqrstuvwxyz";
      var name = '';
      for (var i = 0; i < 3; i++) {
        name += alphabet[(Math.random() * alphabet.length)];
      }
      for (var i = 0; i < 4; i++) {
        name += toString(Math.random() * 10));
      }
      
      //var name = (Math.random()+1).toString(36).substring(3, 5);
      for(i in usernames){
        User.findOneAndUpdate({ username : usernames[i] }, {solar_system : name}, function(err, user) {
          if (err) throw err;
            console.log(user.solar_system);
        })
      }
    }
  })

});


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

//app.listen(port, host);
http.listen({
  host: host,
  port: port
}, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
