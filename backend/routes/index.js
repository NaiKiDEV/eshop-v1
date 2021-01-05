var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Backend service is working correctly!");
});

module.exports = router;
