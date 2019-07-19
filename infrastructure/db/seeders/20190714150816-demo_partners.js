'use strict';

const PartnerArray = require("./../fixtures/partners");

module.exports = {
  up: (queryInterface, Sequelize) => {

    for(let I=0; I < PartnerArray.length; I++){
        PartnerArray[I]['createdAt'] = new Date();
        PartnerArray[I]['updatedAt'] = new Date();
    }

    return queryInterface.bulkInsert('Partners', PartnerArray);
  },

  down: (queryInterface, Sequelize) => {

    const deletablePartners = [];
    for(let I=0; I < PartnerArray.length; I++){
      deletablePartners.push(PartnerArray[I].id);
    }

    return queryInterface.bulkDelete("Partners",{
        "id": {
            [Sequelize.Op.in]: deletablePartners
        }
    });
  }
};
