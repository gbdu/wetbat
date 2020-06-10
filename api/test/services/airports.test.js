const assert = require('assert');
const app = require('../../src/app');

describe('\'airports\' service', () => {
  it('registered the service', () => {
    const service = app.service('airports');

    assert.ok(service, 'Registered the service');
  });
});
