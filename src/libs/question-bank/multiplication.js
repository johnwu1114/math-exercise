import i18n from "i18next";
import QuestionBankBase from "./base.js";

export default class MultiplicationQuestionBank extends QuestionBankBase {

  constructor(level) {
    super();
    switch (level || 1) {
      case 2:
        this.settings["multiplier"] = 11;
        this.settings["multiplicand"] = 19;
        this.settings["route"] = "multiplication-19x19";
        break;
      default:
        this.settings["multiplier"] = 2;
        this.settings["multiplicand"] = 9;
        this.settings["route"] = "multiplication-9x9";
        break;
    }
    this.settings["title"] = i18n.t(this.settings["route"]);
    this.settings["options"] = this.settings["options"].filter(x => x.name !== "questionCount");
  }

  getSections = () => {
    let sections = [];
    let multiplier = this.getSetting("multiplier");
    let multiplicand = this.getSetting("multiplicand");
    for (let i = multiplier; i <= multiplicand; i++) {
      sections.push({
        text: `${i} x ${multiplicand}`,
        value: i
      });
    }
    return sections;
  }

  initQuestions = () => {
    let sections = this.getSetting("sections");
    let multiplicand = this.getSetting("multiplicand");
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      for (let i = 2; i <= multiplicand; i++) {
        questions.push({
          description: `${section.value} x ${i}`,
          answer: {
            text: this.convertText(section.value * i),
            value: section.value * i
          },
        });
      }
    });
    this.setQuestions(questions);
  }
}