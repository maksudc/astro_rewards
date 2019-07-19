'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Redeems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SubscriberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Subscribers",
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      RewardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "Rewards",
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      codeGeneratedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      codeExpiredAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      applied:{
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Redeems');
  }
};
