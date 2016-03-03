var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Planet = require('../models/planet');
var Solar = require('../models/solar');

var ressourceSchema = new Schema({
  kaga: Number,
  iron: Number,
  watt: Number,
  food: Number,
  water: Number,
  tool: Number,
  lumber: Number
});

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ressources: ressourceSchema,
  created_at: Date,
  updated_at: Date,
  planets : [{ type : ObjectId, ref: 'planet' }],
  solar_system : { type: ObjectId },
  play: Boolean
});

userSchema.plugin(uniqueValidator);

userSchema.methods.initialize = function(planet_id, solar_system_id){
  console.log('---------------------------------------------------');
  console.log('            user schema initialize()');
  console.log('---------------------------------------------------');

  this.ressources = {
    kaga: 100,
    iron: 100,
    watt: 100,
    food: 100,
    water: 100,
    tool: 100,
    lumber: 100
  };
  this.planets.push(planet_id);
  this.solar_system = solar_system_id;

  this.save();
}

userSchema.methods.getSolar = function(){
  console.log('-----------------------------------------');
  console.log('                getSolar');
  console.log('-----------------------------------------');
  Solar.findById(this.solar_system).populate('planets').populate('users').exec(function(err, solar) {
      if (err) throw err;
      for(var i in solar.users) {
        console.log('je suis hyper content!!!! :O==#');
        console.log(JSON.stringify(solar.users[i],null, 4));	// so that the display is pretty
        solar.users[i].password = ''; //  otherwise security breach
      }
      console.log(JSON.stringify(solar, null, 4));
      var mySolar = JSON.parse(JSON.stringify(solar));
      solar.name = 'mouche qui pete';
      console.log(JSON.stringify(mySolar, null, 4));
      console.log('zizi');
      return mySolar;
  });
}

var User = mongoose.model('user', userSchema); // we need to create a model using it

module.exports = User;  // make this available to our users in our Node applications
