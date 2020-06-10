'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('quotes', 'destination_date', 'destinationDate');

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('quotes', 'destinationDate', 'destination_date');

  }
};
