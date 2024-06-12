const questionTypes = ['open', 'rating', 'choice','open', 'rating', 'choice', 'open',  'rating','choice','open', 'rating', 'choice' ];
const questions = [
  "What language would you like to learn?",
  "Rate your interest in learning a new language from 1 to 5",
  "Choose the language you would most like to learn:",

  "What do you like most about our academic learning website?",
  "On a scale of 1 to 5, how would you rate the user experience of our website?",
  "Which of the following features do you find most useful?",
  
  "Are there any specific subjects within your area of study that you are particularly interested in?",
  "Have you considered exploring other areas of study?",
  "Do you prefer studying alone or in a group?",

  "What is your preferred area of study?",
  "Do you find online learning platforms helpful for your studies?",
  "How often do you use physical books and libraries for studying?",
];

function build(questionIndex, typeId) {
  return {
    type_id: typeId,
    question: questions[questionIndex],
    created_at: new Date(),
    updated_at: new Date()
  };
}

module.exports = { build };