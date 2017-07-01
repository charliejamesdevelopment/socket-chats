var ChatBox = require('./models/chat_box')
var User = require('./models/user')
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;
var validate_ID = mongoose.Types.ObjectId;

var createChatBox = function(data, callback) {
  new ChatBox(data).save(function(err) {
    if(err) {
      callback(false, "Something went wrong (error: 4)")
    } else {
      callback(true, "Created")
    }
  });
}

var isInt = function(int) {
  try {
    parseInt(int)
  } catch(e) {
    return false;
  }
  return true
}


var addMessageToChatBox = function(data, callback) {
  if(validate_ID.isValid(data._id)) {
    getChatBoxData(data._id, function(result, message) {
      if(result === true) {
        var new_messages = message.messages;
        new_messages.push({username: data.username, message: data.message, color: data.color})
        ChatBox.update({_id: data._id}, {$set: {messages: new_messages}}, function(err) {
          if(err) {
            callback(false, "Something went wrong (error: 3)")
          } else {
            callback(true);
          }
        });
      } else {
        callback(false, "Invalid chatbox (error: 1)")
      }
    });
  } else {
    callback(false, "Invalid chatbox (error: 2)")
  }
}

var getAllChatBoxes = function(callback) {
  ChatBox.find({}, function(err, docs) {
    if(err) {
      callback(false, "Something went wrong (error: 5)")
    } else if(docs.length == 0) {
      callback(false, "0 chatboxes found!")
    } else {
      callback(true, docs);
    }
  });
}

var getUserData = function(username, callback) {
  User.find({username:username}, function(err, docs) {
    if(err) {
      callback(false, "Something went wrong (error: 6)")
    } else if(docs.length == 0) {
      callback(false, "0 users found!")
    } else {
      callback(true, docs[0]);
    }
  });
}

var getChatBoxData = function(chat_id, callback) {
  if(validate_ID.isValid(chat_id)) {
    ChatBox.find({_id:new ObjectID(chat_id)}, function(err, docs) {
      if(err) {
        callback(false, "Something went wrong (error: 7)")
      } else if(docs.length == 0) {
        callback(false, "0 chatboxes found!")
      } else {
        callback(true, docs[0]);
      }
    });
  } else {
    callback(false, "Invalid chat id!");
  }
}

module.exports = {
  getChatBoxData:getChatBoxData,
  createChatBox:createChatBox,
  getAllChatBoxes: getAllChatBoxes,
  getUserData:getUserData,
  addMessageToChatBox:addMessageToChatBox,
  isInt: isInt
}
