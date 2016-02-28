var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');
var Planet = require('../models/planet');

var solarSchema = new Schema({
  name: String,
  planets : [{ type : ObjectId, ref: 'planet' }]
});

solarSchema.methods.initialize = function(users, nPlanets, maxPlayer) {
  console.log('solarSchema.methods.initialize');
  console.log(JSON.stringify(users, null, 4));
  this.name = randomstring.generate({
    length: 3,
    charset: 'alphabetic'
  });
  this.name += ' ';
  this.name += randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  for(var i = 0; i < nPlanets; i++){
    if(i < maxPlayer){
      motherPlanet = new Planet({
          name: users[i].username + 'polis',
          pop: 10,
          buildings: [ { type: 'qg' } ],
          spaceships: [ {
              spaceship_dammage: 0,
              human_dammage: 0,
              defence: 100,
              cost: 20,
              name: 'The ' + users[i].username
            } ],
          civilized: true,
          owner: users[i]._id
        });
      motherPlanet.save();
      //users[i].planets.push(motherPlanet._id);
      //  db.collection.findOneAndUpdate(filter, update, options)
      console.log(User);
      //User.findOneAndUpdate({ username : users[i].username }, { $push : {planets : motherPlanet._id}, $set : {solar_system : this._id} });
      this.planets.push(motherPlanet._id);
      console.log((this._id.className));
      var _id = mongoose.Types.ObjectId(this._id);
      console.log(mongoose.Types.ObjectId.isValid(_id));
      //users[i].initialize(motherPlanet._id, this._id);
    }else{

    }
  }
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
module.exports = Solar;
