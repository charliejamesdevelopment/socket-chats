var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var flash = require('connect-flash')
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var chat_room = require('./routes/chat_room')
var create_chat_box = require('./routes/create_chat_box')
var database = require('./routes/database')
var mongoose = require('mongoose');
var app = express();

mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database successfully")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ["socketkey1", "socketkey2"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/chat_room', chat_room);
app.use('/create_chat_box', create_chat_box);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.port || 3000;

var server = app.listen(port,function(){
  console.log("Express is running on port " + port);
  var io = require('socket.io')(server);
  var utils = require("./routes/utils")
  io.on('connection', function(socket) {
    socket.on('join_room_request', function(data) {
      utils.getChatBoxData(data.room, function(result, message) {
        if(result === true) {
          console.log(io.of('/').in(data.room).clients.length + "," + message.max_users)
          if(io.of('/').in(data.room).clients.length <= message.max_users) {
            socket.join(data.room);
          } else {
            socket.emit('join_room_request_response', {message: "This room is currently full!"})
          }
        }
      })
    })

    socket.on('new_message', function(data) {
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
    });

    socket.on('get_previous_chats', function(data) {
      utils.getChatBoxData(data.room, function(result, message) {
        if(result === true) {
          socket.emit("receive_previous_chats", {messages: message.messages})
        } else {
          socket.emit("chat_box_error", {message: "Something went wrong with getting chatbox data"})
        }
      })
    })
  })
});
