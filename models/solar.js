var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');
//var Solar = require('../models/planet');


var spaceshipSchema = new Schema({
  spaceship_dammage: Number,
  human_dammage: Number,
  defence: Number,
  cost: Number,
  name: String
});

var buildingSchema = new Schema({
  type: String
})

var planetSchema = new Schema({
  name: String,
  pop: Number,
  buildings: [buildingSchema],
  spaceships: [spaceshipSchema],
  civilized: Boolean,
  owner: { type: ObjectId, ref: 'user' }
});

var Planet = mongoose.model('planet', planetSchema);

var solarSchema = new Schema({
  name: String,
  planets : [ type: mongoose.Schema.Types.ObjectId ]
});

solarSchema.methods.initialize = function(planetsId) {
  this.name = randomstring.generate({
    length: 3,
    charset: 'alphabetic'
  });
  this.name += ' ';
  this.name += randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  this.planets = planetsId;
  console.log('planetsId ' + JSON.stringify(planetsId, null, 4));
  console.log('this.planets' + JSON.stringify(this.planets, null, 4));
  console.log(typeof this.planets[0]);
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
module.exports = Solar;
