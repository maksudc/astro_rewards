'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Partners', {
      "name": "uniq_name",
      "fields": ["name"],
      "type": "UNIQUE",
      "unique": true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex("Partners", "uniq_name");
  }
};
