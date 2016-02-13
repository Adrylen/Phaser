// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date,
  planets: Array,
  solar_system: { type: Number, required: true }
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
userSchema.methods.findByUsername = function(username, password, cb) {
  // add some stuff to the users name
  /*this.name = this.name + '-dude';
  return this.name;*/
};

userSchema.methods.initialize = function() {
  console.log('');
  console.log('bazzinga');
  console.log('');
  this.planets.push( {
    name: this.username + 'polis',
    pop: 10,
    ressources: { kaga: 100, iron: 50 },
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
  this.solar_system = "Milky Way"
};

// on every save, add the date
userSchema.pre('save', function(next) {
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
