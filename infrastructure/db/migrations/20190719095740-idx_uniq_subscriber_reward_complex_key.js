'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn("Redeems", "slug", {
      type: Sequelize.STRING,
      allowNull: false
    })
    .then(function(){

      return queryInterface.addIndex('Redeems', {
        "name": "uniq_slug",
        "fields": ["slug"],
        "type": "UNIQUE",
        "unique": true
      })
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeIndex('Redeems', "uniq_slug")
    .then(function(){
      return queryInterface.removeColumn("Redeems", "slug");
    });
  }
};
