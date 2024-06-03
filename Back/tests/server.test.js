const request = require('supertest');
const Server = require('../server');

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = new Server();
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('responds to /user', (done) => {
    request(server)
      .get('/user')
      .expect(200, done);
  });

});