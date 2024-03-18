const { Factory } = require('rosie');

const questionTypes = ['open', 'rating', 'choice'];

//Se crea una factoria para cada elemento del array, hago lo mismo el resto de archivos menos en userFactory.js que se generan de forma aleatoria.

questionTypes.forEach((type, index) => {
  Factory.define(`questionType${index}`)
    .attr('name', type);
});

module.exports = Factory;