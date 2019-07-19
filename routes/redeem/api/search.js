var express = require('express');
var router = express.Router();

var config = require("config");
var moment = require("moment-timezone");
var HttpStatus = require("http-status-codes");

var Db = require("./../../../infrastructure/db/models");

router.get("/", function(req, res){

  SubscriberId = req.query.SubscriberId;
  RewardId = req.query.RewardId;

  console.log(req.query);

  if(!SubscriberId || !RewardId){

    res.status(HttpStatus.BAD_REQUEST).send({
      "error": "SubscriberId and RewardId are manatory parameters"
    });
  }else{

    RedeemModel = Db.Redeem;

    RedeemModel.findOne({
      where: {
        SubscriberId: SubscriberId,
        RewardId: RewardId
      }
    })
    .then(function(redeem){
      if(redeem){

        redeem.dataValues.codeGeneratedAt = moment.tz(redeem.get("codeGeneratedAt"), config.get("Core.timezone.common")).format();
        redeem.dataValues.codeExpiredAt = moment.tz(redeem.get("codeExpiredAt"), config.get("Core.timezone.common")).format();

        res.status(HttpStatus.OK).send(redeem);
      }
      else{
        res.status(HttpStatus.NOT_FOUND).send({});
      }
    });
  }
});

module.exports = router;
