'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addIndex('Subscribers', {
      "name": "uniq_mykadNumber",
      "fields": ["mykadNumber"],
      "type": "UNIQUE",
      "unique": true
    })
    .then(function(){

      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_oldNricNumber",
        "fields": ["oldNricNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
    .then(function(){

      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_passportNumber",
        "fields": ["passportNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
    .then(function(){

      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_armyIdNumber",
        "fields": ["armyIdNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
    .then(function(){

      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_policeIdNumber",
        "fields": ["policeIdNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
    .then(function(){

      return queryInterface.addIndex('Subscribers', {
        "name": "uniq_navyIdNumber",
        "fields": ["navyIdNumber"],
        "type": "UNIQUE",
        "unique": true
      });
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeIndex('Subscribers', "uniq_mykadNumber")
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_oldNricNumber");
    })
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_passportNumber");
    })
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_armyIdNumber");
    })
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_policeIdNumber");
    })
    .then(function(){
      return queryInterface.removeIndex('Subscribers', "uniq_navyIdNumber");
    });
  }
};
