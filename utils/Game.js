/*
* Class Game
* Contains erverything about initialization of the game
*/

var Planet = require('../models/planet');
var User = require('../models/user');
var Solar = require('../models/solar');
var Message = require('../models/message');

function Game(){
  this.coeff = 10;
  this.generators = [
    {building: 'mine', ressource: 'iron'},
    {building: 'generator', ressource: 'watt'},
    {building: 'farm', ressource: 'food'},
    {building: 'factory', ressource: 'tool'},
    {building: 'lumberjack', ressource: 'lumber'},
    {building: 'pump', ressource: 'water'}
  ];
}

/*
* initialization of the game
* create a solar system and its planets when all players are ready to go
*/
Game.prototype.initialize = function (io) {
  var usernames = [];
  io.on('connection', function(socket, req){

    socket.on('start', function(username){

      if(usernames.indexOf(username) == -1){
        usernames.push(username);
      }

      socket.emit('user connected', usernames);
      socket.broadcast.emit('user connected', usernames);

      socket.on('disconnect', function(){
        usernames = [];
        socket.broadcast.emit('user disconnected');
      })

      var maxPlayer = 6;
      if(usernames.length == maxPlayer) {
        socket.emit('start ready');
        socket.broadcast.emit('start ready');

        solar = new Solar({});
        solar.save();
        var users = [];
        for(var i in usernames){
          User.findOne({ username: usernames[i] }, function(err, user){
            try {
              users.push(user);
              if(user.username == usernames[usernames.length-1]){
                solar.initialize(users, maxPlayer); // create mother planet and so on...
                return;
              }
            } catch (e) {
              console.log('-----------------------------');
              console.log(e);
              console.log('-----------------------------');
            }
          })
        }
      }
    })

  });
}

Game.prototype.event = function(io){
    socket.on('connection', function(socket, req){
        socket.on('AskCommerce', function(data){
              /**
               * var data = {
                   from_user_id = from_user_id,
                   ask_for = ask_for,
                   to_user_id = to_user_id,
                   against = against
               }
               */
           User.findById(data.to_user_id, function(err, user){
               user.addMessage("AskCommerce", data);
           });
       });

       socket.on('ResCommerce', function(data){
             /**
              * var data = {
                  res: Boolean  // 0 pas ok, 1 ok
                  from_user_id = from_user_id,
                  ask_for = ask_for,
                  to_user_id = to_user_id,
                  against = against
              }
              */
          User.findById(data.to_user_id, function(err, user){
              user.addMessage("ResCommerce", data);
          });
      });
      socket.on('DeclareWar', function(data){
          /**
          var data = {
              attacker_id: attacker_id,
              attacked_id: attacked_id,
              attacker_ships = attacker_ships,
              attacked_ships = attacked_ships
          }
           */
      })
    })
}

Game.prototype.updateGames = function(){
  Solar.find({}, function(err, solars){
    if (err) throw err;
    for(var i in solars){
      solars[i].update(1);
    }
  })
}

Game.prototype.sendData = function(io){
  io.on('connection', function(socket, req){
    socket.on('game', function(solar_id){
      Solar.findById(solar_id).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
        socket.emit('gameSend', solar);
      });
    });
  })
}


module.exports = Game;
