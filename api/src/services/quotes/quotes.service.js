// Initializes the `quotes` service on path `/quotes`
const { Quotes } = require('./quotes.class');
const createModel = require('../../models/quotes.model');
const hooks = require('./quotes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/quotes', new Quotes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('quotes');

  service.hooks(hooks);
};
