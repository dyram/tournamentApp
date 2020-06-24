'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    mid: DataTypes.STRING
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};