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
  planets: [{ type : ObjectId, ref: 'planet' }],
  play: Boolean,
  solar_system: { type: ObjectId, ref: 'solar' }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.initialize = function() {
    var motherPlanet = new Planet({
      name: this.username + 'polis',
      pop: 10,
      buildings: [ { type: 'qg' } ],
      spaceships: [ {
          spaceship_dammage: 0,
          human_dammage: 0,
          defence: 100,
          cost: 20,
          name: 'The ' + this.username
        } ],
      civilized: true,
      owner: this._id
    });
    motherPlanet.save(function(err){
      if (err) throw err;
    });

  this.planets.push(motherPlanet._id);
  this.solar_system = null;
};

userSchema.methods.editSolar_system = function(name){
       this.solar_system = name;
}

// on every save, add the date
userSchema.pre('save', function(next) {

  console.log(JSON.stringify(this.planets[0].name, null, 4));

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
