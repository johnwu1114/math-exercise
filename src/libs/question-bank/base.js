export default class QuestionBankBase {
  selectionCount = 6;

  generateChoices = (question) => {
    let answer = question.answer;
    let answerRange = question.answerRange || 20;
    let seeds = [];
    for (let i = Math.max(2, answer - answerRange); i < answer + answerRange; i++) {
      if (i !== answer) seeds.push(i);
    }

    let randomCount = this.selectionCount - 1;
    let choices = this.pickRandomItems(seeds, randomCount);
    choices.splice(this.getRandomInt(randomCount), 0, answer);
    return choices;
  }

  pickRandomItems = (arr, count) => {
    let items = []
    for (let i = 0; i < count; i++) {
      let index = this.getRandomInt(arr.length);
      let item = arr.splice(index, 1)[0];
      items.push(item);
    }
    return items;
  }

  getRandomInt = (max) => {
    return this.getRandomIntRange(0, max);
  }

  getRandomIntRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  addQuestions = (questions) => {
    this.questions = this.questions || [];
    this.questions = this.questions.concat(questions || []);
  }

  nextQuestion = () => {
    if (this.questions.length === 0) return null;
    let index = this.getRandomInt(this.questions.length);
    let question = this.questions.splice(index, 1)[0];
    question.choices = this.generateChoices(question);
    return this.currentQuestion = question;
  }

  checkAnswer = (reply) => {
    return reply === this.currentQuestion.answer;
  }
}