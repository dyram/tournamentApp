'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    tName: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    seatCost: DataTypes.FLOAT
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
  };
  return Tournament;
};