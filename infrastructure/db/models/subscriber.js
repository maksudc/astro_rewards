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
  }, {});
  Subscriber.associate = function(models) {
    // associations can be defined here
  };
  return Subscriber;
};
