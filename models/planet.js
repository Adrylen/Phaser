var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');
var Solar = require('../models/solar');

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

module.exports = Planet;
