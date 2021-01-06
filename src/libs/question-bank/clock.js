import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";
import Clock from "../../components/clock.jsx";

export default class ClockQuestionBank extends QuestionBankBase {
  secondsInDay = 24 * 60 * 60;

  constructor() {
    super();
    this.settings["title"] = "時鐘練習";
    this.settings["questionCount"] = 10;
  }

  getOptions = () => {
    let sections = this.getSections();
    sections[0].selected = true;

    return [
      {
        title: "請選擇",
        name: "sections",
        type: "multiple-choice",
        selections: sections
      }
    ];
  }

  getSections = () => {
    return [{
        text: "整點鐘",
        intervalSeconds: 60 * 60,
        answerRange: 10
      },
      {
        text: "半點鐘",
        intervalSeconds: 30 * 60,
        answerRange: 10
      },
      {
        text: "5分鐘",
        intervalSeconds: 5 * 60,
        answerRange: 10
      },
      {
        text: "1分鐘",
        intervalSeconds: 1 * 60,
        answerRange: 10
      },
      {
        text: "時分秒",
        intervalSeconds: 5,
        answerRange: 120
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
        let disableSecondhand = section.intervalSeconds !== 5;
        let random = RandomUtil.getRandomInt(this.secondsInDay / 2);
        random = random - random % section.intervalSeconds;
        let key = this.convertText(random, disableSecondhand);
        hashMap.set(key, {
          description: <Clock hhmmss={key} disableSecondhand={disableSecondhand.toString()} />,
          answer: {
            text: key,
            value: random
          },
          answerRange: section.answerRange,
          intervalSeconds: section.intervalSeconds,
          disableSecondhand: disableSecondhand
        });
      }
      hashMap.forEach((value) => {
        questions.push(value);
      });
    });
    this.setQuestions(questions);
  }

  generateChoices = (question) => {
    let answer = question.answer.value;
    let answerRange = question.answerRange * question.intervalSeconds;
    let intervalSeconds = question.intervalSeconds;
    let seeds = [];
    for (let i = Math.max(0, answer - answerRange); i < Math.min(answer + answerRange, this.secondsInDay / 2); i += intervalSeconds) {
      if (i !== answer) seeds.push({
        text: this.convertText(i, question.disableSecondhand),
        value: i
      });
    }

    let randomCount = this.getSetting("choiceCount") - 1;
    let choices = RandomUtil.pickRandomItems(seeds, randomCount);
    choices.splice(RandomUtil.getRandomInt(randomCount), 0, {
      text: this.convertText(answer, question.disableSecondhand),
      value: answer
    });
    return choices;
  }

  convertText = (value, disableSeconds) => {
    let hour = Math.floor(value / (60 * 60)) + 1;
    let minute = Math.floor(value % (60 * 60) / 60);
    let second = value % 60;
    let result = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    if (!disableSeconds) result += `:${second.toString().padStart(2, "0")}`;

    return result;
  }
}