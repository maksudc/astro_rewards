'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    PartnerId:{
      type: DataTypes.INTEGER,
      references:{
        model: "Partners",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    format: {
      type: DataTypes.ENUM('online', 'store'),
      allowNull: false
    },
    featured: {
      type: DataTypes.BOOLEAN
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Reward.associate = function(models) {
    Reward.belongsTo(models.Partner);
    Reward.belongsToMany(models.Subscriber, {
      through: "Redeems",
      as: "redeemers",
      foreignKey: "RewardId"
    });
  };
  return Reward;
};
