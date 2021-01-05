import RandomUtil from "../utils/random.js";

export default class QuestionBankBase {
  selectionCount = 6;

  generateChoices = (question) => {
    let answer = question.answer.value;
    let answerRange = question.answerRange || 20;
    let seeds = [];
    for (let i = Math.max(2, answer - answerRange); i < answer + answerRange; i++) {
      if (i !== answer) seeds.push({
        text: this.convertText(i),
        value: i
      });
    }

    let randomCount = this.selectionCount - 1;
    let choices = RandomUtil.pickRandomItems(seeds, randomCount);
    choices.splice(RandomUtil.getRandomInt(randomCount), 0, {
      text: this.convertText(answer),
      value: answer
    });
    return choices;
  }

  setQuestions = (questions) => {
    this.questions = questions || [];
  }

  nextQuestion = () => {
    if (this.questions.length === 0) return null;
    let index = RandomUtil.getRandomInt(this.questions.length);
    let question = this.questions.splice(index, 1)[0];
    question.choices = this.generateChoices(question);
    return this.currentQuestion = question;
  }

  checkAnswer = (reply) => {
    return reply != null && reply.toString() === this.currentQuestion.answer.value.toString();
  }

  convertText = (value) => {
    return value.toString();
  }

  getComponentName = () => {
    return "QuizAttempt";
  }
}