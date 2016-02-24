var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');
var Solar = require('../models/planet');

var solarSchema = new Schema({
  name: String,
  planets : [{ type : ObjectId, ref: 'planet' }]
});

solarSchema.methods.initialize = function(planetsId) {
  thsis.name = randomstring.generate({
    length: 3,
    charset: 'alphabetic'
  });
  name += ' ';
  name += randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  this.planets = planetsId;
  console.log('planetsId ' + JSON.stringify(planetsId, null, 4));
  console.log('this.planets' + JSON.stringify(this.planets, null, 4));
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
// make this available to our users in our Node applications
module.exports = Solar;
