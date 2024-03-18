const { Factory } = require('rosie');
const faker = require('faker');

const roleNames = ['teacher', 'guardian', 'student', 'admin'];

roleNames.forEach((role, index) => {
  Factory.define(`role${index}`)
    .attr('name', role);
});

module.exports = Factory;