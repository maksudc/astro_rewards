var Promise = require("bluebird");
var HttpStatus = require("http-status-codes");

var db = require("./../../../infrastructure/db/models");
var RewardModel = db.Reward;
var PartnerModel = db.Partner;

module.exports = function(req, res){

  sortOrder = [["createdAt", "DESC"]];

  if(req.query.sortKey){

    sortKeyParts = req.query.sortKey.split(":");
    sortColumn = sortKeyParts[0];
    sortDir = sortKeyParts[1];
    sortOrder = [[sortColumn, sortDir]];
  }

  return RewardModel.findAll({
    attributes: [
      "id", "title", "flash", "format",
      "start_date", "expiry_date", "banner",
      "PartnerId", "createdAt"
    ],
    order: sortOrder
  })
  .map(function(reward){

    return Promise.all([
      Promise.resolve(reward),
      PartnerModel.findOne({
        attributes: ["id", "name", "logo"],
        where: {
          "id": reward.get("PartnerId")
        }
      })
    ]);
  })
  .map(function(complexResult){

    reward = complexResult[0];
    partner = complexResult[1];

    reward.dataValues.partner = partner.dataValues;

    return Promise.resolve(reward);
  })
  .then(function(rewards){

    result = rewards;
    res.status(HttpStatus.OK).send(rewards);
  })
  .catch(function(err){
    if(err){
      console.error(err.stack);
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  });
};
