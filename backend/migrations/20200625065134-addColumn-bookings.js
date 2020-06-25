'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Bookings", "UserId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        }),
        queryInterface.addColumn("Bookings", "TournamentId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Tournaments",
            key: "id"
          }
        })
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Bookings", "UserId"),
        queryInterface.removeColumn("Bookings", "TournamentId")
      ]);
    });
  }
};
