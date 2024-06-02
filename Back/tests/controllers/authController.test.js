const sinon = require('sinon');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generate_jwt');
const UserConnection = require('../database/userConnection');
const authController = require('../authController');

describe('authController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should register a new user', async () => {
    const req = {
      body: {
        email: 'test@test.com',
        name: 'Test',
        second_name: 'User',
        password: 'password',
        photo_id: 'photo_id',
        extension: 'extension',
        roles: ['role1', 'role2']
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    const mockUser = { id: 'id', name: 'Test' };
    const mockToken = 'token';

    sinon.stub(UserConnection.prototype, 'insertUser').resolves(mockUser);
    sinon.stub(generarJWT).resolves(mockToken);

    await authController.register(req, res);

    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.calledWith({ token: mockToken })).toBe(true);
  });

});