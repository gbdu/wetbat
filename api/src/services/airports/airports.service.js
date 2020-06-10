// Initializes the `airports` service on path `/airports`
const { Airports } = require('./airports.class');
const createModel = require('../../models/airports.model');
const hooks = require('./airports.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/airports', new Airports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('airports');

  service.hooks(hooks);
};
