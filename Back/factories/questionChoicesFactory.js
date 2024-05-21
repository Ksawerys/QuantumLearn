const { Factory } = require('rosie');

Factory.define('wordArray')
  .attr('words', () => ['chat', 'calendario', 'chatbot']);

module.exports = Factory;