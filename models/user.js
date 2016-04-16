var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Planet = require('../models/planet');
var Solar = require('../models/solar');
var Message = require('../models/message');

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
  messages : [{ type : ObjectId, ref: 'message' }],
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

userSchema.methods.addMessage = function(type, data){
    nMessage = new Message({type: type, data: data});
    this.messages.push(nMessage);
    this.save();
}

userSchema.methods.editRessource = function(type, amount){
    this.ressources.type += amount;
    this.save();
}

userSchema.methods.getSolar = function(callback){
  console.log('-----------------------------------------');
  console.log('                getSolar');
  console.log('-----------------------------------------');
  Solar.findById(this.solar_system).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
    if (err) throw err;
    console.log(JSON.stringify(solar, null, 4));
    if(solar == undefined){
        callback(mySolar, false); //  unAuthorized to ask for the page
    }
    for(var i in solar.users) {
      solar.users[i].password = ''; //  otherwise security breach
    }
    var mySolar = JSON.parse(JSON.stringify(solar, err));  // copy object instead of reference
    callback(mySolar, true);
  });
}

var User = mongoose.model('user', userSchema); // we need to create a model using it

module.exports = User;  // make this available to our users in our Node applications
