'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('quotes', 'departure_date', 'departureDate');

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('quotes', 'departure_date','departureDate');

  }
};

