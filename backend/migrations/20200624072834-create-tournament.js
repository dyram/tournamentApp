'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tName: {
        type: Sequelize.STRING
      },
      seats: {
        type: Sequelize.INTEGER
      },
      seatCost: {
        type: Sequelize.FLOAT
      },
      tDesc: {
        type: Sequelize.STRING
      },
      available: {
        type: Sequelize.BOOLEAN
      },
      availSeats: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tournaments');
  }
};