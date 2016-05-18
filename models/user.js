var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var modelSP = require('../models/modelSP');
var Message = require('../models/message');

console.log('users modelSP', modelSP);


var forcesSchema = new Schema({
  fantassin: Number,
  blinde: Number,
  vaisseau: Number
});

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
  forces: forcesSchema,
  messages : [{ type : ObjectId, ref: 'message' }],
  planets : [{ type : ObjectId, ref: 'planet' }],
  solar_system : { type: ObjectId },
  play: { type: Boolean, default: false },
  over: { type: Boolean, default: false },
  won: { type: Boolean, default: false },
	animal: String
});

userSchema.plugin(uniqueValidator);

userSchema.methods.initialize = function(planet_id, solar_system_id){
  console.log('---------------------------------------------------');
  console.log('            user schema initialize()');
  console.log('---------------------------------------------------');

  this.ressources = {
    kaga: 10000,
    iron: 10000,
    watt: 10000,
    food: 10000,
    water: 10000,
    tool: 10000,
    lumber: 10000
  };
  this.forces = {
    fantassin: 1,
    blinde: 1,
    vaisseau: 1
  }
  this.planets.push(planet_id);
  this.solar_system = solar_system_id;

  this.play = true;
  this.over = false;
  this.won = false;

  this.save();
}

userSchema.methods.setOver = function(bool){
  this.over = bool;
  this.save();
}

userSchema.methods.setWon = function(bool){
  this.won = bool;
  this.save();
}

userSchema.methods.setPlay = function(bool){
  this.play = bool;
  this.save();
}

userSchema.methods.addMessage = function(type, data){
    nMessage = new Message({type: type, data: data});
    this.messages.push(nMessage);
    this.save();
}
/*
userSchema.methods.editRessource = function(type, user_id, level){
	User.findById(user_id, function(err, user){
		userSchema.methods.editRessource('kaga', - (Math.exp(level) * 1000));
		console.log(user);
	})
}
*/
userSchema.methods.editKaga = function(amount){
    this.ressources.kaga += amount;
    this.save();
}
/*
userSchema.methods.deletePlanet = function(planet_id){
	/*function findPlanetById(planet, planet_id){
		return planet._id === planet_id;
	}
	this.planets.find(findPlanetById);*/
	/*this.planets = [];
	this.save();
}*/


userSchema.methods.getSolar = function(callback){
  console.log('-----------------------------------------');
  console.log('                getSolar');
  console.log('-----------------------------------------');
  modelSP.Solar.findById(this.solar_system).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
    if (err) throw err;
    //console.log(JSON.stringify(solar, null, 4));
    if(solar == undefined){
      callback(mySolar, false); //  unAuthorized to ask for the page
    }else{
      for(var i in solar.users) {
        solar.users[i].password = ''; //  otherwise security breach
      }
    }
    var mySolar = JSON.parse(JSON.stringify(solar, err));  // copy object instead of reference
    callback(mySolar, true);
  });
}

var User = mongoose.model('user', userSchema); // we need to create a model using it

module.exports = User;  // make this available to our users in our Node applications
