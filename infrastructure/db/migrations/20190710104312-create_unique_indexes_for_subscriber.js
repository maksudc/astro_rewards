'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Subscribers', {
      "name": "uniq_accountNumber",
      "fields": ["accountNumber"],
      "type": "UNIQUE",
      "unique": true
    })
    .then(function(){
      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_smartCardNumber",
        "fields": ["smartCardNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Subscribers', "uniq_accountNumber")
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_smartCardNumber");
    });
  }
};
