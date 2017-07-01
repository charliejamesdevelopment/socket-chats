var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require("./models/user");
var colors = require("./colors");

/* POST login page. */
router.post('/', function(req, res, next) {
  if(!req.session.username) {
    var username = req.body.username.toLowerCase();
    if(username !== "") {
      User.find({username: username}, function(err, doc) {
        if(err) {
          req.flash("message", "Something went wrong!");
          res.redirect("/login")
        } else {
          if(doc.length == 0) {
            colors.randomColor(function(color) {
              var newUser = User({
                username: username,
                color: color
              }).save(function(err) {
                if(err) {
                  req.flash("message", "Something went wrong!");
                  res.redirect("/login")
                } else {
                  req.session.username = username;
                  req.flash("message", "A new user has been created for you. You can now sign in with Username: " + username + ", to login!");
                  res.redirect("/");
                }
              });
            });
          } else {
            req.session.username = username;
            res.redirect("/");
          }
        }
      });
    } else {
      req.flash("message", "Please enter a username!");
      res.redirect("/login")
    }
  } else {
    res.redirect('/')
  }
});

/* GET login page. */
router.get('/', function(req, res, next) {
  if(!req.session.username) {
    var message = req.flash("message")
    res.render('login', {
      title: 'Login Page',
      message: message
    });
  } else {
    res.redirect("/")
  }
});

module.exports = router;
