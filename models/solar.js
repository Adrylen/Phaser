var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Moniker = require('../moniker');
var planets = Moniker.generator([Moniker.planet]);  //  initialize planets generator

var User = require('../models/user');
var Planet = require('../models/planet');

var solarSchema = new Schema({
  name: String,
  planets : [{ type : ObjectId, ref: 'planet' }]
});

solarSchema.methods.initialize = function(users, maxPlayer) {
  console.log('solarSchema.methods.initialize');

  this.name = randomstring.generate({length: 3, charset: 'alphabetic' });
  this.name += ' ';
  this.name += randomstring.generate({ length: 4, charset: 'numeric' });

  for(var i = 0; i < maxPlayer; i++){
    motherPlanet = new Planet({
      name: planets.choose(),
      pop: 1000,
      buildings: [{ type: 'ambassade'}],
      spaceships: [{
        spaceship_dammage: 0,
        human_dammage: 0,
        defence: 100,
        cost: 1000,
        name: 'space cruiser 1'
      }],
      a: 200 + i*50,
      b: 100 + i*25,
      direction: i%2,
      img: i+1,  // image num 1, 2, 3...
      owner: users[i]._id,
      civilized: true
    });
    motherPlanet.save();
    this.planets.push(motherPlanet._id);
    users[i].initialize(motherPlanet._id, this._id);
  }
  this.save();
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
module.exports = Solar;
