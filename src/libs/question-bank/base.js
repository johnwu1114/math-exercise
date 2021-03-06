import i18n from "i18next";
import RandomUtil from "../utils/random.js";

export default class QuestionBankBase {

  constructor() {
    this.settings = {
      component: "QuizAttempt",
      enableReview: true,
      choiceCount: 6,
      options: [{
          title: i18n.t("sections"),
          name: "sections",
          type: "multiple-choice"
        },
        {
          title: i18n.t("answering-method"),
          name: "anwser-method",
          type: "single-choice",
          selections: [{
              text: i18n.t("choice"),
              value: "choice",
              selected: true
            },
            {
              text: i18n.t("filling"),
              value: "filling"
            }
          ]
        },
        {
          title: i18n.t("time-limit"),
          name: "timeoutSeconds",
          type: "range-slider",
          value: 10,
          unit: i18n.t("seconds"),
          min: 3,
          max: 60,
          step: 1
        },
        {
          title: i18n.t("number-of-questions"),
          name: "questionCount",
          type: "range-slider",
          value: 20,
          unit: i18n.t("questions"),
          min: 10,
          max: 100,
          step: 5
        }
      ]
    };
  }

  getTitle = () => this.getSetting("title");

  getCount = () => this.count;

  getCursor = () => this.cursor;

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

    let randomCount = this.getSetting("choiceCount") - 1;
    let choices = RandomUtil.pickRandomItems(seeds, randomCount);
    choices.splice(RandomUtil.getRandomInt(randomCount), 0, {
      text: this.convertText(answer),
      value: answer
    });
    return choices;
  }

  setQuestions = (questions) => {
    this.questions = questions || [];
    this.count = this.questions.length;
    this.cursor = 0;
  }

  nextQuestion = () => {
    if (this.questions.length === 0) return null;
    this.cursor++;
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

  getOptions = () => {
    let sections = this.getSections();
    sections[0].selected = true;

    let options = this.getSetting("options");

    return options.map(x => {
      if (x.name === "sections") x.selections = sections;
      else if (x.name === "timeoutSeconds") x.value = 10;
      else if (x.name === "questionCount") x.value = 20;
      return x;
    });
  }

  setSettings = (options) => {
    options.forEach(option => {
      this.settings[option.name] = option.selections || option.value;
    });
  }

  getSetting = (name) => {
    return this.settings[name];
  }
}