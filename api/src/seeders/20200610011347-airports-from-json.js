'use strict';

const airports_file = require('./airports.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let airports = [];
      
    for (let i in airports_file){
      let {name, city, country, code, lat, lon} = airports_file[i];
      if(name && city && country && code){
        airports.push({
          name,
          city,
          country,
          code,
          lat,
          lon
        });
      }
    }
    return queryInterface.bulkInsert('airports', airports);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('airports', null, {});
  }
};
