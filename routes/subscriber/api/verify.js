var Promise = require("bluebird");
var HttpStatus = require("http-status-codes");

var db = require("./../../../infrastructure/db/models");
var SubscriberModel = db.Subscriber;
var HttpStatus = require('http-status-codes');


module.exports = function (req, res) {

    if(req.body.query){

      let whereQuery = Object.assign({}, req.body.query);
      let accountIdentifierNumber = req.body.accountIdentifierNumber;

      let accountIdentifierColumn = null;
      if(accountIdentifierNumber.length == 10){
        accountIdentifierColumn = "accountNumber";
      }else if(accountIdentifierNumber.length == 12){
        accountIdentifierColumn = "smartCardNumber";
      }else{
        return res.status(HttpStatus.BAD_REQUEST).send({
          "message": "invalid params"
        });
      }

      whereQuery[accountIdentifierColumn] = accountIdentifierNumber;

      return SubscriberModel.findOne({
          where: whereQuery
      })
      .then(function (subscriber) {

          if(subscriber){

            returnData = {};
            returnData["id"] = subscriber.get("id");
            returnData["accountNumber"] = subscriber.get("accountNumber");
            returnData["smartCardNumber"] = subscriber.get("smartCardNumber");
            returnData[accountIdentifierColumn] = accountIdentifierNumber;
            
            if(req.body.rememberMe){
              //@TODO: Attach session to the user
            }

            res.status(HttpStatus.OK).send({
              "meta":{},
              "data": returnData
            });
          }else{

            res.status(HttpStatus.NOT_FOUND).send();
          }
      })
      .catch(function (err) {
          if(err){
            console.error(err.stack);
          }
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      });
    }

    res.status(HttpStatus.BAD_REQUEST).send({
      "message": "invalid params"
    });
};
