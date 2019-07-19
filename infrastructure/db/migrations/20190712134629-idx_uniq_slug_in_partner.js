'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Partners', {
      "name": "uniq_slug",
      "fields": ["slug"],
      "type": "UNIQUE",
      "unique": true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Partners', "uniq_slug");
  }
};
