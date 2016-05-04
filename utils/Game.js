/*
* Class Game
* Contains erverything about initialization and updating of the game
*/

var app = require ('../app');
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

        socket.on('AskCommerce', function(building_id){

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
             if(data.res){
                 // l'aquiesceur
                 User.findById(data.to_user_id, function(err, user){
                     user.editRessource(ask_for.type, -ask_for.amount); // on retire
                     user.editRessource(against.type, against.amount);  // on ajoute
                 });
                 // le demandeur
                 User.findById(data.from_user_id, function(err, user){
                     user.editRessource(against.type, -against.amount); // on retire
                     user.editRessource(ask_for.type, ask_for.amount);  // on ajoute
                 });
             }
          User.findById(data.from_user_id, function(err, user){
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

    socket.on('buildingUpgrade', function(data){
      console.log('---------------------------------------------');
      console.log('');
      console.log(data);
      console.log('');
      console.log('---------------------------------------------');
    })
}

Game.prototype.updateGames = function(){
  /**
   * ressource update
   * Check if player is defeated
   * Check if player won
   */
  Solar.find({}).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solars) {
    if (err) throw err;
    for(var i in solars){

      solars[i].update(1);  // update ressource of each solar system
      /**
       * Vérifier dans les routes que l'utilisateur a bien gagné ou perdu
       */
      for(var j in solars[i].users){
        if(Game.prototype.iWin(solars[i].users[j]._id)){
          app.redirect('../game/win');
        }
        if(Game.prototype.iLoose(solars[i].users[j]._id)){
          app.redirect('../game/over');
          console.log('pouet');
        }
      }
    }
  });
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

Game.prototype.iWin = function(user_id){
    console.log('--------------------------------------------------');
    console.log(user_id);
    console.log('--------------------------------------------------');
    User.findById(user_id, function(err, user){
      if (user != undefined) {
        if (user.planets.length == 6) {
          return true;
        }
        return false;
      }
    })
}

Game.prototype.iLoose = function(user_id){
    console.log('--------------------------------------------------');
    console.log(user_id);
    console.log('--------------------------------------------------');
    User.findById(user_id, function(err, user){
      if(user != undefined){
        if (user.planets.length == 0) {
          return true;
        }
        return false;
      }
    })
}

module.exports = Game;