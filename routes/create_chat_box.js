var express = require('express');
var utils = require('./utils')
var ChatBox = require('./models/chat_box')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('create_chat_box', {
      title: 'Create Chat Box',
      username: req.session.username,
      message: req.flash("message")
    });
  } else {
    res.redirect("/login")
  }
});

/* POST login page. */
router.post('/', function(req, res, next) {
  if(req.session.username) {
    var name = req.body.name;
    var description = req.body.description;
    var max_users = req.body.max_users;
    if(name !== "" && description !== "" && max_users != "") {
      if(utils.isInt(max_users)) {
        var newChatBox = ChatBox({
          name: name,
          description: description,
          max_users: max_users,
          messages: []
        }).save(function(err) {
          if(err) {
            console.log(err)
            req.flash("message", "Something went wrong!");
            res.redirect("/create_chat_box")
          } else {
            req.flash("message", "A new chat room has been created for you called: " +name);
            res.redirect("/");
          }
        });
      } else {
        req.flash("message", "Please enter a valid max users number.");
        res.redirect("/create_chat_box")
      }
    } else {
      req.flash("message", "Please fill all fields!");
      res.redirect("/create_chat_box")
    }
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
