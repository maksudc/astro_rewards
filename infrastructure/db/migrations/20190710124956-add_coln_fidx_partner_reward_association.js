'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Rewards", "PartnerId", {
      type: Sequelize.INTEGER,
      references:{
        model: "Partners",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Rewards", "PartnerId");
  }
};
