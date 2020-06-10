const contacts = require('./contacts/contacts.service.js');
const quotes = require('./quotes/quotes.service.js');
const airports = require('./airports/airports.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(contacts);
  app.configure(quotes);
  app.configure(airports);
};
