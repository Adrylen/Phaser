var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Moniker = require('../utils/moniker');
var planets = Moniker.generator([Moniker.planet]);  //  initialize planets generator

var User = require('../models/user');
var Planet = require('../models/planet');

console.log(Planet);

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

  this.name = randomstring.generate({length: 3, charset: 'alphabetic' });
  this.name += ' ';
  this.name += randomstring.generate({ length: 4, charset: 'numeric' });
  //console.log(JSON.stringify(users, null, 4));
  planetNames = [];
  try {
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
  } catch (e) {
    console.log("users is not defined");
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
module.exports = Solar;
