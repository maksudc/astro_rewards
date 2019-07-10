'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define('Subscriber', {
    accountNumber: DataTypes.STRING
  }, {});
  Subscriber.associate = function(models) {
    // associations can be defined here
  };
  return Subscriber;
};