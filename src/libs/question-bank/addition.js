import RandomUtil from "../utils/random.js";
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
      },
      {
        text: "三位數加法",
        minimum: 100,
        minSummation: 200,
        maxSummation: 999,
        answerRange: 50
      },
      {
        text: "四位數加法",
        minimum: 1000,
        minSummation: 2000,
        maxSummation: 9999,
        answerRange: 50
      }
    ];
  }

  generateQuestions = (sections) => {
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < this.questionCount) {
        let summation = RandomUtil.getRandomIntRange(section.minSummation, section.maxSummation);
        let x = RandomUtil.getRandomIntRange(section.minimum, summation - section.minimum);
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