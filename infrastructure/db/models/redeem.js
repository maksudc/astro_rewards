'use strict';
module.exports = (sequelize, DataTypes) => {
  const Redeem = sequelize.define('Redeem', {
    SubscriberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "Subscribers",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    RewardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "Rewards",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    slug:{
      type: DataTypes.STRING,
      allowNull: false
    },
    codeGeneratedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codeExpiredAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    applied:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Redeem.associate = function(models) {

    Redeem.belongsTo(models.Subscriber, {
      as: "subscriber",
      foreignKey: "SubscriberId",
      targetKey: "id"
    });

    Redeem.belongsTo(models.Reward, {
      as: "reward",
      foreignKey: "RewardId",
      targetKey: "id"
    });
  };

  return Redeem;
};
