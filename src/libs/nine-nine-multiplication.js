export default class NineNineMultiplication {
  selectionCount = 6;

  constructor() {
    this.addQuestions(this.generateQuestions());
  }

  generateQuestions = () => {
    let questions = [];
    for (let i = 2; i <= 9; i++) {
      for (let j = 2; j <= 9; j++) {
        questions.push({
          question: `${i} x ${j}`,
          answer: i * j
        });
      }
    }
    return questions;
  }

  generateSelections = (answer) => {
    let seeds = [];
    for (let i = Math.max(2, answer - 20); i < answer + 20; i++) {
      if (i !== answer) seeds.push(i);
    }

    let selections = [];
    for (let i = 1; i < this.selectionCount; i++) {
      let index = Math.floor(Math.random() * seeds.length);
      let selection = seeds.splice(index, 1)[0];
      selections.push(selection);
    }
    selections.splice(Math.floor(Math.random() * 5), 0, answer);

    return selections;
  }

  addQuestions = (questions) => {
    this.questions = this.questions || [];
    this.questions = this.questions.concat(questions || []);
  }

  nextQuestion = () => {
    if (this.questions.length === 0) return null;
    let index = Math.floor(Math.random() * this.questions.length);
    let question = this.questions.splice(index, 1)[0];
    question.selections = this.generateSelections(question.answer);
    return this.currentQuestion = question;
  }

  checkAnswer = (reply) => {
    return reply === this.currentQuestion.answer;
  }
}