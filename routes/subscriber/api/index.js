var express = require('express');
var router = express.Router();

var getSubscriber = require("./verify");
router.post("/verify", getSubscriber);

module.exports = router;
