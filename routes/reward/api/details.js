var Promise = require("bluebird");
var HttpStatus = require("http-status-codes");

var db = require("./../../../infrastructure/db/models");
var RewardModel = db.Reward;
var PartnerModel = db.Partner;

module.exports = function(req, res){

  let reward = null;

  RewardModel.findOne({
    where: {
      "id": req.params.id
    }
  })
  .then(function(rewardInstance){

    reward = rewardInstance;
    try{
      reward.dataValues.description  = JSON.parse(reward.dataValues.description);
    }catch(ex){
      reward.dataValues.description = [];
    }

    return reward.getPartner({
      attributes: ["id", "name", "slug", "logo"]
    });
  })
  .then(function(partner){

    reward.dataValues.partner = partner.dataValues;
    res.status(HttpStatus.OK).send(reward);
  })
  .catch(function(err){
    if(err){
      console.error(err.stack);
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  });
};
