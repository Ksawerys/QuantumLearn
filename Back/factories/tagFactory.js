const { Factory } = require('rosie');

Factory.define('tags')
  .attr('names', () => ['Study method', 'Start date', 'End date', 'Priority', 'Complete', 'Grade', 'Exam', 'Homework'])
  .attr('descriptions', () => [
  'Describe the specific study method employed.', 
  'Indicates the commencement date of the task.', 
  'Indicates the conclusion date of the task.', 
  'Represents the level of urgency of a task.', 
  'Specifies the conclusion of a task.', 
  'Used to assign a score or grade for exams or assignments.', 
  'Denotes that the note is associated with an exam.', 
  'Identifies the note as related to a homework assignment.'
  ])
  .attr('types', () => ['string', 'date', 'date', 'priority', 'boolean', 'grade', 'boolean', 'boolean'])

module.exports = Factory;