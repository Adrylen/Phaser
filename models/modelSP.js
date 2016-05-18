var mongoose = require('mongoose');
var randomstring = require("randomstring");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Moniker = require('../utils/moniker');
var planets = Moniker.generator([Moniker.planet]);  //  initialize planets generator


//////////////////////////////////////////////////////////////////Planet//////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////end Planet//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////Solar//////////////////////////////////////////////////////////////////


var solarSchema = new Schema({
  name: String,
  users: [{ type : ObjectId, ref: 'user' }]
});

function inTab(tab, item){
  for(var i in tab){
    if(tab[i] == item){
      return true;
    }
  }
  return false;
}

solarSchema.methods.initialize = function(users, maxPlayer) {
  console.log('users', users);
  this.name = randomstring.generate({length: 3, charset: 'alphabetic' });
  this.name += ' ';
  this.name += randomstring.generate({ length: 4, charset: 'numeric' });
  //console.log(JSON.stringify(users, null, 4));
  planetNames = [];
    for(var i = 0; i < maxPlayer; i++){
      do {
        var pName = planets.choose();
      } while (inTab(planetNames, pName));
      planetNames.push();
      motherPlanet = new Planet({
        name: pName,
        pop: 1000,
        buildings: [
          { type: 'ambassade', level: 1},
          { type: 'mine', level: 1},
          { type: 'generator', level: 1},
          { type: 'farm', level: 1},
          { type: 'factory', level: 1},
          { type: 'lumberjack', level: 1},
          { type: 'pump', level: 1}
        ],
        coeff: 1.00 - (i*0.15),  // coeff demis grand axe ellipse
        direction: i%2,
        img: i+1,  // image num 1, 2, 3...
        owner: users[i]._id,
        civilized: true
      });
      motherPlanet.save();
      this.users.push(users[i]._id);
      users[i].initialize(motherPlanet._id, this._id);
    }
  this.save();
}

solarSchema.methods.update = function (coeff) {
  Solar.findById(this._id).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
    for(var i in solar.users){
      for(var j in solar.users[i].planets){
        for(var k in solar.users[i].planets[j].buildings){
          //console.log(solar.users[i].planets[j].buildings[k].type);
          switch (solar.users[i].planets[j].buildings[k].type) {
            case 'ambassade':
              solar.users[i].ressources.kaga += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'mine':
              solar.users[i].ressources.iron += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'generator':
              solar.users[i].ressources.watt += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'farm':
              solar.users[i].ressources.food += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'factory':
              solar.users[i].ressources.tool += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'lumberjack':
              solar.users[i].ressources.lumber += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
            case 'pump':
              solar.users[i].ressources.water += solar.users[i].planets[j].buildings[k].level * coeff;
              break;
          }
        }
      }
      solar.users[i].save();
    }
  })
}

// we need to create a model using it
var Solar = mongoose.model('solar', solarSchema);
//////////////////////////////////////////////////////////////////end Solar//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////User//////////////////////////////////////////////////////////////////

var messageSchema = new Schema({
  type: String, // victory, defeat, commerce, battle, alliance
  data: Object,
  owner: { type: ObjectId, ref: 'user' }
});

var forcesSchema = new Schema({
  soldier: Number,
  tank: Number,
  ship: Number
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
  messages : [messageSchema],
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
    soldier: 1,
    tank: 1,
    ship: 1
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
    nMessage = {type: type, data: data};
    this.messages.push(nMessage);
    this.save();
}

userSchema.methods.buy = function(data){
  this.forces.soldier += data.soldier;
  this.forces.tank += data.tank;
  this.forces.ship += data.ship;

  this.ressources.food -= data.soldier * 100;
  this.ressources.water -= data.soldier * 100;

  this.ressources.iron -= data.tank * 100;
  this.ressources.watt -= data.tank * 100;

  this.ressources.tool -= data.tanke * 100;
  this.ressources.lumber -= data.tanke * 100;

  this.save();
}

userSchema.methods.invade = function(planets){
  this.planets = this.planets.concat(planets);
  this.save();
}

userSchema.methods.capitulate = function(){
  this.planets = [];
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
  Solar.findById(this.solar_system).populate({path: 'users', populate:{path: 'planets', model: 'planet'}}).populate('planets').exec(function(err, solar) {
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
//////////////////////////////////////////////////////////////////end User//////////////////////////////////////////////////////////////////

var modelSP = { Solar: Solar, Planet: Planet, User: User};
module.exports = modelSP;
