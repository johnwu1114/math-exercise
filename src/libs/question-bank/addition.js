import i18n from "i18next";
import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";

export default class AdditionQuestionBank extends QuestionBankBase {

  constructor() {
    super();
    this.settings["route"] = "addition";
    this.settings["title"] = i18n.t(this.settings["route"]);
  }

  getSections = () => {
    return [{
        text: i18n.t("add-within-10"),
        minimum: 0,
        minSummation: 1,
        maxSummation: 10,
        answerRange: 10, 
        maxCount: 45
      },
      {
        text: i18n.t("add-within-20"),
        minimum: 0,
        minSummation: 10,
        maxSummation: 20,
        answerRange: 10
      },
      {
        text: i18n.t("two-digit-addition"),
        minimum: 10,
        minSummation: 20,
        maxSummation: 99,
        answerRange: 20
      },
      {
        text: i18n.t("three-digit-addition"),
        minimum: 100,
        minSummation: 200,
        maxSummation: 999,
        answerRange: 50
      },
      {
        text: i18n.t("four-digit-addition"),
        minimum: 1000,
        minSummation: 2000,
        maxSummation: 9999,
        answerRange: 50
      }
    ];
  }

  initQuestions = () => {
    let sections = this.getSetting("sections") || this.getSections();
    let questionCount = this.getSetting("questionCount");
    let questionCountOfSection = Math.ceil(questionCount / sections.length);
    let questions = [];
    sections.forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < Math.min(questionCountOfSection, section.maxCount || questionCount)) {
        let summation = RandomUtil.getRandomIntRange(section.minSummation, section.maxSummation);
        let x = RandomUtil.getRandomIntRange(section.minimum, summation - section.minimum);
        let y = summation - x;
        let key = `${x} + ${y}`;
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
    questions = RandomUtil.pickRandomItems(questions, Math.min(questionCount, questions.length));
    for (let i = 0; questions.length < questionCount; i++) {
      if (i >= questions.length) i = 0;
      questions.push(questions[i]);
    }
    this.setQuestions(questions);
  }
}