'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn("Rewards", "flash", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn("Rewards", "flash", {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
  }
};
