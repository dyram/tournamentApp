'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    tName: DataTypes.STRING,
    tDesc: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    seats: DataTypes.INTEGER,
    seatCost: DataTypes.FLOAT
  }, {});
  Tournament.associate = function (models) {
    // associations can be defined here
  };
  return Tournament;
};