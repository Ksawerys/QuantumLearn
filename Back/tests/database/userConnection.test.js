const sinon = require('sinon');
const UserConnection = require('../UserConnection');
const model = require('../model'); 

describe('UserConnection', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user', async () => {
    const user = { email: 'test@test.com', password: 'password' };
    const hashedPassword = 'hashedPassword';
    const roles = ['role1', 'role2'];

    const mockUser = { addRoles: sinon.stub() };
    const mockRoleInstances = [{}, {}];

    sinon.stub(model.User, 'create').resolves(mockUser);
    sinon.stub(model.Role, 'findAll').resolves(mockRoleInstances);

    const userConnection = new UserConnection();
    const result = await userConnection.newUser(user, hashedPassword, roles);

    expect(result).toEqual(mockUser);
    expect(mockUser.addRoles.calledWith(mockRoleInstances)).toBe(true);
  });

  it('should get user login', async () => {
    const email = 'test@test.com';
    const mockUser = { email };

    sinon.stub(model.User, 'findOne').resolves(mockUser);

    const userConnection = new UserConnection();
    const result = await userConnection.getUserLogin(email);

    expect(result).toEqual(mockUser);
  });
});