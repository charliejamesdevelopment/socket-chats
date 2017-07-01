var express = require('express');
var utils = require('./utils')
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  if(req.session.username) {
    if(req.params.id) {
      utils.getChatBoxData(req.params.id, function(result, message) {
        if(result === true) {
          res.render('chat_room', {
            title: 'Chat Room',
            username: req.session.username,
            message: req.flash("message"),
            chat: message
          });
        } else {
          req.flash("message", message)
          res.redirect("/")
        }
      });
    } else {
      req.flash("message", "Please specify a chat room id!")
      res.redirect("/")
    }
  } else {
    res.redirect("/login")
  }
});

module.exports = router;
