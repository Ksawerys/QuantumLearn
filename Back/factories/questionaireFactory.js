const { Factory } = require('rosie');

Factory.define('questionnaire')
  .sequence('id')
  .attr('title', ['id'], (id) => {
    switch(id) {
      case 1: return 'Language Learning Preferences';
      case 2: return 'Website User Experience';
      case 3: return 'Study Interests and Habits';
      case 4: return 'Online Learning and Resource Usage';
      default: return 'Unnamed Questionnaire';
    }
  })
  .attr('description', ['id'], (id) => {
    switch(id) {
      case 1: return 'This questionnaire is about your preferences and interests in learning a new language.';
      case 2: return 'This questionnaire is about your experience and satisfaction with our academic learning website.';
      case 3: return 'This questionnaire is about your study habits and areas of interest.';
      case 4: return 'This questionnaire is about your usage of online learning platforms and physical study resources.';
      default: return 'This is an unnamed questionnaire.';
    }
  });

module.exports = Factory;