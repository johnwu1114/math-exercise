import QuestionBankBase from "./base.js";

export default class AdditionQuestionBank extends QuestionBankBase {
  questionCount = 10;

  getSections = () => {
    return [{
        text: "10 以內加法",
        minimum: 0,
        minSummation: 1,
        maxSummation: 10,
        answerRange: 10
      },
      {
        text: "20 以內加法",
        minimum: 0,
        minSummation: 10,
        maxSummation: 20,
        answerRange: 10
      },
      {
        text: "兩位數加法",
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
        let summation = this.getRandomIntRange(section.minSummation, section.maxSummation);
        let x = this.getRandomIntRange(section.minimum, summation);
        let y = summation - x;
        let question = `${x} + ${y}`;
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