import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";

export default class SubtractionQuestionBank extends QuestionBankBase {

  constructor() {
    super();
    this.settings["title"] = "減法練習";
    this.settings["questionCount"] = 10;
  }
  
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
      },
      {
        text: "三位數減法",
        minimum: 100,
        minSummation: 200,
        maxSummation: 999,
        answerRange: 50
      },
      {
        text: "四位數減法",
        minimum: 1000,
        minSummation: 2000,
        maxSummation: 9909,
        answerRange: 50
      }
    ];
  }

  initQuestions = () => {
    let sections = this.getSetting("sections");
    let questionCount = this.getSetting("questionCount");
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < questionCount) {
        let x = RandomUtil.getRandomIntRange(section.minSummation, section.maxSummation);
        let y = RandomUtil.getRandomIntRange(section.minimum, x);
        let summation = x - y;
        let key = `${x} - ${y}`;
        hashMap.set(key, {
          description: key,
          answer: {
            text: this.convertText(summation),
            value: summation
          },
          answerRange: section.answerRange
        });
      }
      hashMap.forEach((value) => {
        questions.push(value);
      });
    });
    this.setQuestions(questions);
  }
}