var utils = require("./routes/utils")

module.exports = function(socket, io){
  return {
    new_message: function(data) {
      if(data.username && data.message && data.chat_id) {
        utils.getUserData(data.username, function(result, user) {
          if(result === true) {
            utils.addMessageToChatBox({username: data.username, message: data.message, color: user.color, _id: data.chat_id},function(result, message) {
              if(result === true) {
                socket.emit("chat_box_success", {message: "Successfully submitted message"});
                io.to(data.chat_id).emit("new_message", {username: data.username, message: data.message, color: user.color})
              } else {
                socket.emit("chat_box_error", {message: message})
              }
            })
          } else {
            socket.emit("chat_box_error", {message: "User could not be found!"})
          }
        });
      }
    },
    get_previous_chats: function(data) {
      utils.getChatBoxData(data.room, function(result, message) {
        if(result === true) {
          socket.emit("receive_previous_chats", {messages: message.messages})
        } else {
          socket.emit("chat_box_error", {message: "Something went wrong with getting chatbox data"})
        }
      })
    },
    join_room_request: function(data) {
      utils.getChatBoxData(data.room, function(result, message) {
        if(result === true) {
          if(io.of('/').in(data.room).clients.length <= message.max_users) {
            socket.join(data.room);
          } else {
            socket.emit('join_room_request_response', {message: "This room is currently full!"})
          }
        }
      })
    }
  }
}
