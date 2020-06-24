'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const passwordHash = require("password-hash");
    let adminPass = passwordHash.generate("admin")
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: adminPass,
      money: 100.0,
      role: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
