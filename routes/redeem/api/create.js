var express = require('express');
var router = express.Router();

var config = require("config");
var Promise = require("bluebird");
var moment = require("moment-timezone");
var HttpStatus = require("http-status-codes");

var Db = require("./../../../infrastructure/db/models");
var sequelize = Db.sequelize;
var RedeemModel = Db.Redeem;

router.post("/", function(req, res){

  sequelize.transaction(function(t){

    redeemData = req.body.redeem;
    slug = redeemData["SubscriberId"] + ":" + redeemData["RewardId"];

    console.log(redeemData);

    return RedeemModel.findOne({
      where: {
        slug: slug
      },
      transaction: t,
      limit: 1
    })
    .then(function(redeem){

      if(redeem){

        return Promise.reject({
          "code": HttpStatus.CONFLICT,
          "message": "You have already redeemed this reward"
        });
      }

      redeemData["slug"] = slug;
      redeemData["codeGeneratedAt"] = moment().utc();
      redeemData["codeExpiredAt"] = moment().utc().add(config.get("Core.redeem.duration"), config.get("Core.redeem.unit"));
      redeemData["code"] =  Math.random().toString(36).slice(2, 2 + config.get("Core.redeem.codeLength")).toUpperCase();

      return RedeemModel.create(redeemData, {
        transaction: t
      });
    });
  })
  .then(function(redeem){

    res.status(HttpStatus.CREATED).send(redeem);
  })
  .catch(function(err){
    if(err){
      console.error(err.stack);
    }
    if(err.code){
      res.status(err.code).send(err);;
    }else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);;
    }
  })
});

module.exports = router;
