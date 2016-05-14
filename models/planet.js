var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');
var Solar = require('../models/solar');
var Message = require('../models/message');

//console.log(User);

var buildingSchema = new Schema({
  type: String,
  level: Number
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
  coeff: Number,  //  demis grands axes de l'ellipse
  direction: Boolean, // sens horaire ou sens trigo
  img: Number,  // img de la planete
  owner: { type: ObjectId, ref: 'user' }
});

planetSchema.methods.upgradeBuilding = function(building_id, user_id){
	console.log('planetSchema');
	for(var i in this.buildings){
		if(this.buildings[i]._id == building_id){
			var level = this.buildings[i].level++;
			//User.methods.editRessource('kaga', user_id, this.buildings[i].level)
			/*User.findById(user_id, function(err, user){
				//userSchema.methods.editRessource('kaga', - (Math.exp(level) * 1000));
				console.log(user);
			})*/
			Planet.findById(this._id).populate('owner').exec(function(err, planet){
				planet.owner.editKaga(- (level*level * 100));
			})
		}
	}
  this.save();
}

var Planet = mongoose.model('planet', planetSchema);
module.exports = Planet;
