/*
* Class Game
* Contains erverything about initialization of the game
*/

var User = require('../models/user');
var Solar = require('../models/solar');

function Game(){

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
        console.log(usernames);
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

/*
* Method to update ressources of all players of the game
*
*/
Game.prototype.update = function (solar) {

}

module.exports = Game;
