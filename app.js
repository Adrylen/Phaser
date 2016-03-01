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

var Moniker = require('./moniker');
var planets = Moniker.generator([Moniker.planet]);
console.log(planets.choose());


var host = process.env.VCAP_APP_HOST || process.env.HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/erkma');

var db = mongoose.connection;
var Schema = mongoose.Schema;

//    models
var User = require('./models/user');
var Solar = require('./models/solar');

//    routes
var routes = require('./routes/index');
var users = require('./routes/users');
var game = require('./routes/game');
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

var usernames = [];
io.on('connection', function(socket, req){

  socket.on('start', function(username){

    usernames.push(username);

    socket.emit('start connected', usernames);
    socket.broadcast.emit('start connected', usernames);

    socket.on('disconnect', function(){
      usernames = [];
      socket.broadcast.emit('user disconnected');
    })
    var maxPlayer = 4;
    var nPlanets = 8;
    if(usernames.length == maxPlayer) {
      socket.emit('start ready');
      socket.broadcast.emit('start ready');

      solar = new Solar({
      });

      var users = [];
      for(var i in usernames){
        User.findOne({ username: usernames[i] }, function(err, user){
          users.push(user);
          if(user.username == usernames[usernames.length-1]){
            solar.initialize(users, nPlanets, maxPlayer);
            solar.save();
            return;
          }
        })
      }
    }

  })

  socket.on('game', function(username, solar_system){
    console.log( solar_system );
      User.find({ solar_system : solar_system }, function(err, users) {
          if (err) return cb(err);
          for(var i in users) {
            //console.log(JSON.stringify(users[i],null, 4));	// so that the display is pretty
            users[i].password = ''; //  otherwise security breach
          }
          socket.emit('data', users);
      })
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
  console.log('-----------------------------------');
  console.log('   listening on *:' + port);
  console.log('-----------------------------------');
});

module.exports = app;
