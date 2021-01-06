import QuestionBankBase from "./base.js";

export default class MultiplicationQuestionBank extends QuestionBankBase {

  constructor(level) {
    super();
    switch (level || 1) {
      case 2:
        this.multiplier = 11;
        this.multiplicand = 19;
        this.name = "19 x 19 乘法練習";
        break;
      default:
        this.multiplier = 2;
        this.multiplicand = 9;
        this.name = "9 x 9 乘法練習";
        break;
    }
  }

  getName = () => {
    return this.name;
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
      for (let i = 2; i <= this.multiplicand; i++) {
        questions.push({
          description: `${section.value} x ${i}`,
          answer: {
            text: this.convertText(section.value * i),
            value: section.value * i
          },
        });
      }
    });
    return questions;
  }
}