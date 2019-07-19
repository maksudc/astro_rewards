'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscribedReward = sequelize.define('SubscribedReward', {
    SubscriberId: DataTypes.NUMBER,
    RewardId: DataTypes.NUMBER,
    codeGenerationDate: DataTypes.DATE
  }, {});
  SubscribedReward.associate = function(models) {
    // associations can be defined here
  };
  return SubscribedReward;
};