'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define('Partner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Partner.associate = function(models) {
    Partner.hasMany(models.Reward);
  };
  return Partner;
};
