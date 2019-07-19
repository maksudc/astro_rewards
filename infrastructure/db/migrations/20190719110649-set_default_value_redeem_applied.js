'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn("Redeems", "applied", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn("Redeems", "applied", {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
  }
};
