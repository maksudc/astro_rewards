var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const RewardRouter = require("./reward/api/index");
router.use("/api/rewards", RewardRouter);

const RedeemRouter = require("./redeem/api/index");
router.use("/api/redeem", RedeemRouter);

const SubsrcriberRouter = require("./subscriber/api/index");
router.use("/api/subscriber", SubsrcriberRouter);

router.get('/', function(req, res, next) {
  res.render('index', { });
});

module.exports = router;
