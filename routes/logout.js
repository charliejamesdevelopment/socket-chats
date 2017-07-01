var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username) {
    req.session = null;
    res.redirect("/login")
  } else {
    res.redirect("/login")
  }
});

module.exports = router;
