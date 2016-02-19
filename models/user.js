// grab the things we need
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// create a schema
var userPrototype = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date,
  planets: Array,
  solar_system: { type: String, required: false, default: 'void' }
};

var userSchema = new Schema( userPrototype );
userSchema.plugin(uniqueValidator);

userSchema.methods.check = function(){
  /*
  var attributes = Object.getOwnPropertyNames(userPrototype);
  for( var k in attributes ) {
    console.log(userPrototype[attributes[k]]);
    //console.log( userPrototype.attributes[k] );
  }*/
/*
  if( userPrototype.username.required == true ) {
    User.find({ username : this.username }, function(err, user){
      console.log('bazzinga');
      if(user.length != 0) {
        return "Ce nom d'utilisateur existe déjà";
      } else {
        return "";
      }
    })
  }
  */

/*
  for(k in userPrototype){
     var value = userPrototype[k];
     if(typeof value === 'object'){
       for(var n in value){
         var subValue = value[n];
         console.log(subValue);
       }
     }else{
       console.log(value);
     }
   }*/

}

userSchema.methods.initialize = function() {
  this.planets.push( {
    name: this.username + 'polis',
    pop: 10,
    ressources: { kaga: 100, iron: 50 },
    buildings: [
      {
        name : 'QG',
        type: 'qg'
      }
    ],
    ships: [
      {
        ship_dammage: 0,
        human_dammage: 0,
        defence: 100,
        cost: 20,
        name: 'The ' + this.username
      }
    ]
  });
  this.solar_system = "void";
};

userSchema.methods.editSolar_system = function(name){
       this.solar_system = name;
}
// on every save, add the date
userSchema.pre('save', function(next) {
  /*
  req.login(user, function(err) {
    if (err) return next(err)
  })*/
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
