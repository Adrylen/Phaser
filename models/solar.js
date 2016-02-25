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
  _id: {type: mongoose.Schema.ObjectId},
  name: String,
  pop: Number,
  buildings: [buildingSchema],
  spaceships: [spaceshipSchema],
  civilized: Boolean,
  owner: { type: ObjectId, ref: 'user' }
});

var planet = mongoose.model('planet', planetSchema);

var solarSchema = new Schema({
  name: String,
  planets : [planetSchema]
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
    var _id = mongoose.Types.ObjectId();
    console.log("_id");
    console.log(typeof _id);
    //this.planets.push(_id);
    if(i < maxPlayer){
      motherPlanet = new planet({
          //_id: _id,
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
          civilized: true
          //owner: users[i]._id
        });
      users[i].planets.push(motherPlanet._id);
      //users[i].initialize(motherPlanet._id, this._id);
    }else{

    }
  }
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
module.exports = Solar;
