import QuestionBankBase from "./base.js";

export default class SubtractionQuestionBank extends QuestionBankBase {
  questionCount = 10;

  getSections = () => {
    return [{
        text: "10 以內減法",
        minimum: 0,
        minSummation: 1,
        maxSummation: 10,
        answerRange: 10
      },
      {
        text: "20 以內減法",
        minimum: 0,
        minSummation: 10,
        maxSummation: 20,
        answerRange: 10
      },
      {
        text: "兩位數減法",
        minimum: 10,
        minSummation: 20,
        maxSummation: 99,
        answerRange: 20
      }
    ];
  }

  generateQuestions = (sections) => {
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < this.questionCount) {
        let x = this.getRandomIntRange(section.minSummation, section.maxSummation);
        let y = this.getRandomIntRange(section.minimum, x);
        let summation = x - y;
        let question = `${x} - ${y}`;
        hashMap.set(question, {
          question: question,
          answer: summation,
          answerRange: section.answerRange
        });
      }
      hashMap.forEach((value) => {
        questions.push(value);
      });
    });
    return questions;
  }
}