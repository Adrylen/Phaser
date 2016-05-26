/*
* Class Game
* Contains erverything about initialization and updating of the game
*/

//var app = require ('../app');
var modelSP = require('../models/modelSP.js');
var Solar = modelSP.Solar;
var Planet = modelSP.Planet;
var User = modelSP.User;


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
                for(var i=0; i < maxPlayer; i++){
                    User.findOne({ username: usernames[i] }, function(err, user){
                      users.push(user);
                      if(users.length == maxPlayer){
                          solar.initialize(users, maxPlayer); // create mother planet and so on...)');
                          return;
                      }
                    })
                }
            }
        })

				Game.prototype.event(socket);

    });
}

Game.prototype.event = function(socket){
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

       socket.on('messageRead', function(data){
         // user_id, message_id
         User.findById(data.user_id, function(err, user){
           user.read(data.message_id);
         });
       })

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
               console.log('data.res');
                 // l'aquiesceur
                 console.log(JSON.stringify(data, null, 4));
                 User.findById(data.to_user_id, function(err, user){
                     user.editRessource(data.ask_for.ressources, -data.ask_for.amount); // on retire
                     user.editRessource(data.against.ressources, data.against.amount);  // on ajoute
                 });
                 // le demandeur
                 User.findById(data.from_user_id, function(err, user){
                     user.editRessource(data.against.ressources, -data.against.amount); // on retire
                     user.editRessource(data.ask_for.ressources, data.ask_for.amount);  // on ajoute
                 });
             }
          User.findById(data.from_user_id, function(err, user){
              user.addMessage("ResCommerce", data);
          });
      });

      socket.on('attack', function(data){
          /**var data = {
              attacker_id: attacker_id,
              attacked_id: attacked_id
          }*/
          User.findById(data.attacker_id, function(err, user1){
            User.findById(data.attacked_id, function(err, user2){
              Game.prototype.battle(user1, user2);
            })
          })

      })
			//data = { user_id, planet_id, building_id }
			socket.on('buildingUpgrade', function(data){
				Planet.findById(data.planet_id, function(err, planet){
					planet.upgradeBuilding(data.building_id, data.user_id);	// 	upgrade level of the building and user pay
				})
      })

      //data = { user_id, soldier: soldier, tank: tank, ship: ship }
      socket.on('buy', function(data){
        console.log('buy');
        console.log(JSON.stringify(data, null, 4));
        User.findById(data.user_id, function(err, user){
          console.log(JSON.stringify(user, null, 4));
          user.buy(data);
        })
      })
}

Game.prototype.updateGames = function(){
  /**
   * ressource update
   * Check if player is defeated
   * Check if player won
   */
  modelSP.Solar.find({}).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solars) {
    if (err) throw err;
    for(var i in solars){

      solars[i].update(1);  // update ressource of each solar system
      /**
       * Vérifier dans les routes que l'utilisateur a bien gagné ou perdu
       */
      for(var j in solars[i].users){
        Game.prototype.iWin(solars[i].users[j]);
        Game.prototype.iLoose(solars[i].users[j]);
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

Game.prototype.iWin = function(user){
    //console.log('--------------------------------------------------');
    //console.log('did ' + user.username + ' win?');
    //console.log('--------------------------------------------------');
    if (user != undefined) {
      if(user.play == true){
        if (user.planets.length == 6) {
          user.setWon(true);
					user.setPlay(false);
        }else{
          user.setWon(false);
        }
      }
    }
}

Game.prototype.iLoose = function(user){
    if (user != undefined) {
      if(user.play == true){
        if (user.planets.length == 0) {
          user.setOver(true);
					user.setPlay(false);
        }else{
          user.setOver(false);
        }
      }
    }
}

Game.prototype.heterogene = function(coeffsoldier, coefftank, coeffship){
  return Math.sqrt( (Math.abs(coeffsoldier - (1/3) ) + Math.abs(coefftank - (1/3) ) + Math.abs(coeffship - (1/3) )) )
}

Game.prototype.normalDist = function(x, sig){
  sig = typeof sig !== 'undefined' ? sig : Math.sqrt(0.9);
  return (1.0/(sig*Math.sqrt(2.0*Math.PI)))*(Math.exp(-(x*x)/(2.0*sig*sig)))
}

Game.prototype.battle = function (user1, user2) {

  nForceUser1 = user1.forces.soldier + user1.forces.tank + user1.forces.ship;
  nForceUser2 = user2.forces.soldier + user2.forces.tank + user2.forces.ship;
  nForcesTotal = nForceUser1 + nForceUser2;

  coeffUser1 = Game.prototype.normalDist(Game.prototype.heterogene(user1.forces.soldier/nForceUser1, user1.forces.tank/nForceUser1, user1.forces.ship/nForceUser1));
  coeffUser2 = Game.prototype.normalDist(Game.prototype.heterogene(user2.forces.soldier/nForceUser2, user2.forces.tank/nForceUser2, user2.forces.ship/nForceUser2));

  coeffTotal = coeffUser1 + coeffUser2;
  console.log('nForcesTotal', nForcesTotal);
  probaUser1 = ((coeffUser1 / coeffTotal) + 5*(nForceUser1 / nForcesTotal)) / 6;
  probaUser2 = ((coeffUser2 / coeffTotal) + 5*(nForceUser2 / nForcesTotal)) / 6;

  rd = Math.random();

  console.log('probaUser1', probaUser1);
  console.log('probaUser2', probaUser2);
  console.log('rd', rd);

  if (probaUser1 > rd){
    user1.invade( user2.planets );
    user2.capitulate();
    user1.loss(probaUser1); // reduce the number of troop
  }else{
    user1.loss(probaUser1); // reduce the number of troop
    user2.loss(probaUser2);
  }
}

/*
Game.prototype.battle(
  {forces:{soldier: 2, tank: 2, ship: 2}},
  {forces:{soldier: 6, tank: 0, ship: 0}});
*/

module.exports = Game;
