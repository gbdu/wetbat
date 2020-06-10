

const processQuote = require('../../hooks/process-quote');

const populateContact = require('../../hooks/populate-contact');

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
    find: [],
    get: [],
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
