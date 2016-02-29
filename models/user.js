var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Planet = require('../models/planet');

var ressourceSchema = new Schema({
  kaga: Number,
  iron: Number,
  watt: Number,
  food: Number,
  water: Number,
  Oxygen: Number
});

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ressources: ressourceSchema,
  created_at: Date,
  updated_at: Date,
  planets : [{ type : ObjectId, ref: 'planet' }],
  solar_system : { type: String, required: true },
  play: Boolean
});

userSchema.plugin(uniqueValidator);

userSchema.methods.initialize = function(solar_system){
  console.log('---------------------------------------------------');
  console.log('            user schema initialize()');
  console.log('---------------------------------------------------');

  var planet = new Planet({
    name: 'Ma planete, la Terre',
    pop: 1000,
    buildings: [{ type: 'ambassade'}],
    spaceships: [{
      spaceship_dammage: 0,
      human_dammage: 0,
      defence: 100,
      cost: 1000,
      name: 'tartiflette'
    }],
    civilized: true
  });
  planet.save();
  this.planets.push(planet._id);
  
  console.log(planet);

  this.solar_system = solar_system;

}

var User = mongoose.model('user', userSchema); // we need to create a model using it

module.exports = User;  // make this available to our users in our Node applications
