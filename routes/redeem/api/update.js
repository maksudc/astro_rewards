var express = require('express');
var router = express.Router();

var config = require("config");
var Promise = require("bluebird");
var moment = require("moment-timezone");
var HttpStatus = require("http-status-codes");

var Db = require("./../../../infrastructure/db/models");
var sequelize = Db.sequelize;
var RedeemModel = Db.Redeem;

router.put("/", function(req, res){

  sequelize.transaction(function(t){

    redeemData = req.body.query;
    slug = redeemData["SubscriberId"] + ":" + redeemData["RewardId"];

    data = req.body.data;

    return RedeemModel.findOne({
      where: {
        slug: slug
      },
      transaction: t,
      lock: true
    })
    .then(function(redeem){

      if(redeem){

        redeemInstance = redeem;

        return redeem.update(data, {
          transaction: t
        });
      }else{
        return Promise.reject({code: HttpStatus.NOT_FOUND});
      }
    });
  })
  .then(function(){
    res.status(HttpStatus.OK).send();
  })
  .catch(function(err){
    if(err){
      console.error(err.stack);
    }
    if(err.code){
      res.status(err.code).send();
    }else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  });
});

module.exports = router;
