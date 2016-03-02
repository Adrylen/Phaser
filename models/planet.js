var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');


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

/*
* Mongoose assigns each of your schemas an id virtual getter
* by default which returns the documents _id field cast to a string,
* or in the case of ObjectIds, its hexString.
*/
var planetSchema = new Schema({
  name: String,
  pop: Number,
  buildings: [buildingSchema],
  spaceships: [spaceshipSchema],
  civilized: Boolean,
  a: Number,  //  demis grands axes de l'ellipse
  b: Number,
  direction: Boolean, // sens horaire ou sens trigo
  img: Number,  // img de la planete
  owner: { type: ObjectId, ref: 'user' }
});

var Planet = mongoose.model('planet', planetSchema);
module.exports = Planet;
