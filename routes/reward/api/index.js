var express = require('express');
var router = express.Router();

var getAllRewards = require("./all");
router.get("/", getAllRewards);

var getDetails = require("./details");
router.get("/:id", getDetails);

module.exports = router;
