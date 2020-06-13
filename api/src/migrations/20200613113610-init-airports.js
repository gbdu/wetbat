'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lon: {
        type: Sequelize.FLOAT(11),
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT(11),
        allowNull: false
      },
      
    } );
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('airports');
    
  }
};
