const { Factory } = require('rosie');

Factory.define('wordArray')
  .attr('words', () => ['Spanish', 'English', 'Chinese', 'AI tools', 'The note features', 'The disign', 'Studing alone', 'In a group', 'Depends on the day', 'Never', 'Sometimes', 'Often']);

module.exports = Factory;