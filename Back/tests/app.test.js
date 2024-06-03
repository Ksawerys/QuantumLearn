const app = require('../app'); 

describe('app tests', () => {
  it('should do something', () => {
    expect(app.someFunction()).toBe('expected result');
  });

  it('should do something else', () => {
    expect(app.someOtherFunction()).toEqual({ expected: 'result' });
  });
});