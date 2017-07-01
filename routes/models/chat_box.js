var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  max_users: {type: Number, required: true},
  messages: {type: Array, required: false}
});
chatSchema.set('collection', 'chat_rooms');
var ChatBox = mongoose.model('ChatBox', chatSchema);

module.exports = ChatBox;
