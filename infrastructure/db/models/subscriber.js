'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define('Subscriber', {
    accountNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    smartCardNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mykadNumber: {
      type: DataTypes.BIGINT(12),
      allowNull: true
    },
    oldNricNumber: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    passportNumber: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    armyIdNumber: {
      type: DataTypes.BIGINT(12),
      allowNull: true
    },
    policeIdNumber: {
      type: DataTypes.BIGINT(12),
      allowNull: true
    },
    navyIdNumber: {
      type: DataTypes.BIGINT(12),
      allowNull: true
    }
  }, {});

  Subscriber.associate = function(models) {

    Subscriber.belongsToMany(models.Reward,{
      through: "Redeems",
      as: "redeemedRewards",
      foreignKey: "SubscriberId"
    });
  };
  return Subscriber;
};
