const { Factory } = require('rosie');

//genero una pregunta por cada tipo de pregunta. Pero los tipos de preguntas que se crean en el seeder son estos pero se definen en el archvio questionTypeFactory.js
const questionTypes = ['open', 'rating', 'choice'];
const questions = [
  "¿Que quieres hacer de mayor?",
  "Puntua del 1 al 5 tu experiencia con la aplicación",
  "Elige que idea te gusta mas como futura implementación de la aplicación"
];

questionTypes.forEach((type, index) => {
  Factory.define(`question${index}`)
    .attr('question', questions[index])
    .attr('type_id', index + 1);
});

module.exports = Factory;