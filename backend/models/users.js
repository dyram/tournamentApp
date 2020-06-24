'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    money: DataTypes.FLOAT,
    role: DataTypes.BOOLEAN,
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};