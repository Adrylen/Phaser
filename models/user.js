var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Solar = require('../models/solar');
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
  play: Boolean,
  solar_system: { type: ObjectId, ref: 'solar' }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.initialize = function(planet_id, solar_id) {
  console.log('userSchema.methods.initialize');
  /*console.log(JSON.stringify(planet_id, null, 4));
  var id = mongoose.Types.ObjectId(planet_id);
  console.log('id ' + mongoose.Types.ObjectId.isValid(id));
  console.log(('planet_id' + mongoose.Types.ObjectId.isValid(planet_id)));
  console.log('solar_id' + mongoose.Types.ObjectId.isValid(solar_id));
  console.log(id.className);
  this.update({ _id: this._id }, { $addToSet : { planets: planet_id }});
  //this.solar_system = solar_id;
  this.solar_system = null;*/
  this.planets.push(planet_id);
  this.solar_system = solar_id;
};

userSchema.methods.editSolar_system = function(name){
       this.solar_system = name;
}

// on every save, add the date
userSchema.pre('save', function(next) {

  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// we need to create a model using it
var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;
