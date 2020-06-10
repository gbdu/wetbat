const assert = require('assert');
const app = require('../../src/app');

describe('\'quotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotes');

    assert.ok(service, 'Registered the service');
  });
});
