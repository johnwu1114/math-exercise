import RandomUtil from "../utils/random.js";

export default class SchulteTableQuestionBank {

  getName = () => {
    return "舒爾特方格";
  }

  getSections = () => {
    let sections = [];
    for (let i = 3; i <= 9; i++) {
      sections.push({
        text: `${i} x ${i} 格`,
        value: i
      });
    }
    return sections;
  }

  generateQuestions = (sections) => {
    let questions = [];
    let count = Math.pow(sections[0].value, 2);
    for (let i = 1; i <= count; i++)
      questions.push(i);
    return RandomUtil.pickRandomItems(questions, count);
  }

  addQuestions = (questions) => {
    this.questions = questions || [];
  }

  nextQuestion = () => {
    this.cursor = 0;
    return this.questions;
  }

  checkAnswer = (reply) => {
    return reply != null && reply === this.cursor;
  }

  convertText = (value) => {
    return value.toString();
  }

  getComponentName = () => {
    return "SchulteTable";
  }

  nextCursor = () => {
    if (this.cursor >= this.questions.length) return null;
    return ++this.cursor;
  }
}