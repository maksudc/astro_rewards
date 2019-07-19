'use strict';

var SubscriberArray = require("./../fixtures/subscribers");

module.exports = {
  up: (queryInterface, Sequelize) => {

    for(let I=0; I < SubscriberArray.length; I++){
      SubscriberArray[I]["createdAt"] = new Date();
      SubscriberArray[I]["updatedAt"] = new Date();
    }

    return queryInterface.bulkInsert('Subscribers', SubscriberArray);
  },

  down: (queryInterface, Sequelize) => {

    const deletables = [];
    for(let I=0; I < SubscriberArray.length; I++){
      deletables.push(SubscriberArray[I].id);
    }

    return queryInterface.bulkDelete("Subscribers",{
        "id": {
            [Sequelize.Op.in]: deletables
        }
    });
  }
};
