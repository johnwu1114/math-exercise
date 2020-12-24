export default class NineNineMultiplication {
  selectionCount = 6;

  constructor() {
    this.addQuestions(this.generateQuestions());
  }

  getSections = () => {
    let sections = [];
    for (let i = 2; i <= 9; i++) {
      sections.push({
        text: `${i} x 9`,
        value: i
      });
    }
    return sections;
  }

  generateQuestions = (sections) => {
    let questions = [];
    (sections || this.getSections().map(x => x.value))
    .forEach(section => {
      for (let j = 2; j <= 9; j++) {
        questions.push({
          question: `${section} x ${j}`,
          answer: section * j
        });
      }
    });
    return questions;
  }

  generateChoices = (answer) => {
    let seeds = [];
    for (let i = Math.max(2, answer - 20); i < answer + 20; i++) {
      if (i !== answer) seeds.push(i);
    }

    let choices = [];
    for (let i = 1; i < this.selectionCount; i++) {
      let index = Math.floor(Math.random() * seeds.length);
      let choice = seeds.splice(index, 1)[0];
      choices.push(choice);
    }
    choices.splice(Math.floor(Math.random() * 5), 0, answer);

    return choices;
  }

  addQuestions = (questions) => {
    this.questions = this.questions || [];
    this.questions = this.questions.concat(questions || []);
  }

  nextQuestion = () => {
    if (this.questions.length === 0) return null;
    let index = Math.floor(Math.random() * this.questions.length);
    let question = this.questions.splice(index, 1)[0];
    question.choices = this.generateChoices(question.answer);
    return this.currentQuestion = question;
  }

  checkAnswer = (reply) => {
    return reply === this.currentQuestion.answer;
  }
}