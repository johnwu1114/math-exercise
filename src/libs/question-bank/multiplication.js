import QuestionBankBase from "./base.js";

export default class MultiplicationQuestionBank extends QuestionBankBase {

  constructor(level) {
    super();
    switch (level || 1) {
      case 2:
        this.settings["multiplier"] = 11;
        this.settings["multiplicand"] = 19;
        this.settings["title"] = "19 x 19 乘法練習";
        this.settings["route"] = "multiplication-9x9";
        break;
      default:
        this.settings["multiplier"] = 2;
        this.settings["multiplicand"] = 9;
        this.settings["title"] = "9 x 9 乘法練習";
        this.settings["route"] = "multiplication-19x19";
        break;
    }
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