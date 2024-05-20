const { Factory } = require('rosie');

const roleNames = ['teacher', 'guardian', 'student', 'admin'];

const roles = roleNames.map((role, index) => {
  return Factory.define(`role`)
    .attr('name', role)
    .build();
});

module.exports = roles;