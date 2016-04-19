var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = require('../models/user');

var messageSchema = new Schema({
  type: String, // victory, defeat, commerce, battle, alliance
  data: Object,
  owner: { type: ObjectId, ref: 'user' }
});

var Message = mongoose.model('message', messageSchema);
module.exports = Message;
