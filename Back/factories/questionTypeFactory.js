const { Factory } = require('rosie');

const questionTypes = ['open', 'rating', 'choice'];

questionTypes.forEach((type, index) => {
  Factory.define(`questionType${index}`)
    .attr('name', type);
});

module.exports = Factory;