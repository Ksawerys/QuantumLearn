const request = require('supertest');
const Server = require('../server');

describe('Server', () => {
  let server;

  // Antes de cada prueba, inicia un nuevo servidor
  beforeEach(() => {
    server = new Server();
    server.listen();
  });

  // Después de cada prueba, cierra el servidor
  afterEach(() => {
    server.close();
  });

  it('responds to /user', (done) => {
    request(server)
      .get('/user')
      .expect(200, done);
  });

  // Agrega más pruebas para las otras rutas aquí
});