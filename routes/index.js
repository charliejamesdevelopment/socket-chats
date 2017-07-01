var express = require('express');
var utils = require('./utils')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username) {
    utils.getAllChatBoxes(function(result, message) {
      if(result === true) {
        res.render('index', {
          title: 'Home',
          username: req.session.username,
          message: req.flash("message"),
          chat_boxes: message
        });
      } else {
        res.render('index', {
          title: 'Home',
          username: req.session.username,
          message: message
        });
      }
    });
  } else {
    res.redirect("/login")
  }
});

module.exports = router;
