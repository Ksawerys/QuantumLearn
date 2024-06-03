const { Factory } = require('rosie');
const faker = require('faker');
const bcrypt = require('bcrypt');

Factory.define('user')
  .attr('name', () => faker.internet.userName())
  .attr('second_name', () => faker.name.lastName())  
  .attr('email', () => faker.internet.email())
  .attr('password', () => bcrypt.hashSync('User123#', 10));

Factory.define('adminUser')
  .attr('name', 'admin')
  .attr('email', 'admin@example.com')
  .attr('password', () => bcrypt.hashSync('Admin123#', 10));


module.exports = Factory;