var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fakecontacts = [];
    for(let c = 0; c < 20; c++){
      let [firstName, lastName] = faker.name.findName().split(' ');
      let contact = {
        firstName,
        lastName,
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat(0),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      console.log(contact);
      fakecontacts.push(contact);
    }

    return queryInterface.bulkInsert('contacts', fakecontacts);
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('contacts', null, {});
    
  }
};
