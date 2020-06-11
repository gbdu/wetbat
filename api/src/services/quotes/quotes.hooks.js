

const processQuote = require('../../hooks/process-quote');

const populateContact = require('../../hooks/populate-contact');

const populateAirports = require('../../hooks/populate-airports');

module.exports = {
  before: {
    all: [processQuote()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populateContact()],
    find: [populateAirports()],
    get: [populateAirports()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
