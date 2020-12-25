export default class MultiplicationQuestionBank {
  selectionCount = 6;


  constructor(level) {
    switch (level || 1) {
      case 2:
        this.multiplier = 11;
        this.multiplicand = 19;
        break;
      default:
        this.multiplier = 2;
        this.multiplicand = 9;
        break;
    }
  }

  getSections = () => {
    let sections = [];
    for (let i = this.multiplier; i <= this.multiplicand; i++) {
      sections.push({
        text: `${i} x ${this.multiplicand}`,
        value: i
      });
    }
    return sections;
  }

  generateQuestions = (sections) => {
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      for (let j = 2; j <= this.multiplicand; j++) {
        questions.push({
          question: `${section.value} x ${j}`,
          answer: section.value * j
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