const { Factory } = require('rosie');

Factory.define('tags')
  .attr('names', () => ['study_method', 'start_date', 'end_date', 'priority', 'complete', 'grade', 'exam', 'homework'])
  .attr('types', () => ['string', 'date', 'date', 'integer', 'boolean', 'integer', 'boolean', 'boolean']);

module.exports = Factory;