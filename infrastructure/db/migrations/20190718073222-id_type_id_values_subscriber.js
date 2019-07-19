'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn("Subscribers" , "mykadNumber", {
      type: Sequelize.BIGINT(12),
      allowNull: true
    })
    .then(function(){

      return queryInterface.addColumn("Subscribers" , "oldNricNumber", {
        type: Sequelize.STRING(9),
        allowNull: true
      });
    })
    .then(function(){

      return queryInterface.addColumn("Subscribers" , "passportNumber", {
        type: Sequelize.STRING(9),
        allowNull: true
      });
    })
    .then(function(){

      return queryInterface.addColumn("Subscribers" , "armyIdNumber", {
        type: Sequelize.BIGINT(12),
        allowNull: true
      })
    })
    .then(function(){

      return queryInterface.addColumn("Subscribers" , "policeIdNumber", {
        type: Sequelize.BIGINT(12),
        allowNull: true
      })
    })
    .then(function(){

      return queryInterface.addColumn("Subscribers" , "navyIdNumber", {
        type: Sequelize.BIGINT(12),
        allowNull: true
      })
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Subscribers", "navyIdNumber")
    .then(function(){
      return queryInterface.removeColumn("Subscribers", "policeIdNumber");
    })
    .then(function(){
      return queryInterface.removeColumn("Subscribers", "armyIdNumber");
    })
    .then(function(){
      return queryInterface.removeColumn("Subscribers", "passportNumber");
    })
    .then(function(){
      return queryInterface.removeColumn("Subscribers", "oldNricNumber");
    })
    .then(function(){
      return queryInterface.removeColumn("Subscribers", "mykadNumber");
    })
  }
};
