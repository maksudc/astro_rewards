'use strict';

var RewardArray = require("./../fixtures/rewards");

module.exports = {
  up: (queryInterface, Sequelize) => {

    for(let I=0; I < RewardArray.length; I++){
      RewardArray[I].description = JSON.stringify(RewardArray[I].description);
      RewardArray[I]["createdAt"] = new Date();
      RewardArray[I]["updatedAt"] = new Date();
    }

    return queryInterface.bulkInsert('Rewards', RewardArray);
  },

  down: (queryInterface, Sequelize) => {

    const deletables = [];
    for(let I=0; I < RewardArray.length; I++){
      deletables.push(RewardArray[I].id);
    }

    return queryInterface.bulkDelete("Rewards",{
        "id": {
            [Sequelize.Op.in]: deletables
        }
    });
  }
};
