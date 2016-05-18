var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Moniker = require('../utils/moniker');
var planets = Moniker.generator([Moniker.planet]);  //  initialize planets generator
var User = require('../models/user');
var Message = require('../models/message');


var buildingSchema = new Schema({
  type: String,
  level: Number
})

/*
* Mongoose assigns each of your schemas an id virtual getter
* by default which returns the documents _id field cast to a string,
* or in the case of ObjectIds, its hexString.
*/
var planetSchema = new Schema({
  name: String,
  pop: Number,
  buildings: [buildingSchema],
  coeff: Number,  //  demis grands axes de l'ellipse
  direction: Boolean, // sens horaire ou sens trigo
  img: Number,  // img de la planete
  owner: { type: ObjectId, ref: 'user' }
});

planetSchema.methods.upgradeBuilding = function(building_id, user_id){
	console.log('planetSchema');
	for(var i in this.buildings){
		if(this.buildings[i]._id == building_id){
			var level = this.buildings[i].level++;
			//User.methods.editRessource('kaga', user_id, this.buildings[i].level)
			/*User.findById(user_id, function(err, user){
				//userSchema.methods.editRessource('kaga', - (Math.exp(level) * 1000));
				console.log(user);
			})*/
			Planet.findById(this._id).populate('owner').exec(function(err, planet){
				planet.owner.editKaga(- (level*level * 100));
			})
		}
	}
  this.save();
}

var Planet = mongoose.model('planet', planetSchema);

var solarSchema = new Schema({
  name: String,
  users: [{ type : ObjectId, ref: 'user' }]
});

function inTab(tab, item){
  for(var i in tab){
    if(tab[i] == item){
      return true;
    }
  }
  return false;
}

solarSchema.methods.initialize = function(users, maxPlayer) {
  console.log('users', users);
  this.name = randomstring.generate({length: 3, charset: 'alphabetic' });
  this.name += ' ';
  this.name += randomstring.generate({ length: 4, charset: 'numeric' });
  //console.log(JSON.stringify(users, null, 4));
  planetNames = [];
    for(var i = 0; i < maxPlayer; i++){
      do {
        var pName = planets.choose();
      } while (inTab(planetNames, pName));
      planetNames.push();
      motherPlanet = new Planet({
        name: pName,
        pop: 1000,
        buildings: [
          { type: 'ambassade', level: 1},
          { type: 'mine', level: 1},
          { type: 'generator', level: 1},
          { type: 'farm', level: 1},
          { type: 'factory', level: 1},
          { type: 'lumberjack', level: 1},
          { type: 'pump', level: 1}
        ],
        coeff: 1.00 - (i*0.15),  // coeff demis grand axe ellipse
        direction: i%2,
        img: i+1,  // image num 1, 2, 3...
        owner: users[i]._id,
        civilized: true
      });
      motherPlanet.save();
      this.users.push(users[i]._id);
      users[i].initialize(motherPlanet._id, this._id);
    }
  this.save();
}

solarSchema.methods.update = function (coeff) {
  Solar.findById(this._id).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
    for(var i in solar.users){
      for(var j in solar.users[i].planets){
        for(var k in solar.users[i].planets[j].buildings){
          //console.log(solar.users[i].planets[j].buildings[k].type);
          switch (solar.users[i].planets[j].buildings[k].type) {
            case 'ambassade':
              solar.users[i].ressources.kaga += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'mine':
              solar.users[i].ressources.iron += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'generator':
              solar.users[i].ressources.watt += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'farm':
              solar.users[i].ressources.food += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'factory':
              solar.users[i].ressources.tool += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'lumberjack':
              solar.users[i].ressources.lumber += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'pump':
              solar.users[i].ressources.water += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
          }
        }
      }
      solar.users[i].save();
    }
  })
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
var modelSP = { Solar: Solar, Planet: Planet};
module.exports = modelSP;
