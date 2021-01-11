import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";
import Clock from "../../components/clock.jsx";

export default class ClockQuestionBank extends QuestionBankBase {
  secondsInDay = 24 * 60 * 60;

  constructor() {
    super();
    this.settings["route"] = "clock";
    this.settings["title"] = "時鐘練習";
  }

  getOptions = () => {
    let sections = this.getSections();
    sections[0].selected = true;

    return [{
        title: "請選擇",
        name: "sections",
        type: "single-choice",
        selections: sections
      },
      {
        title: "答題限時",
        name: "timeoutSeconds",
        type: "range-slider",
        value: 10,
        unit: "秒",
        min: 3,
        max: 60,
        step: 1
      },
      {
        title: "題目數量",
        name: "questionCount",
        type: "range-slider",
        value: 20,
        unit: "題",
        min: 10,
        max: 100,
        step: 5
      }
    ];
  }

  getSections = () => {
    return [{
        text: "整點鐘",
        intervalSeconds: 60 * 60,
        answerRange: 10,
        maxCount: 12
      },
      {
        text: "半點鐘",
        intervalSeconds: 30 * 60,
        answerRange: 10,
        maxCount: 24
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
    let sections = this.getSetting("sections") || this.getSections();
    let questionCount = this.getSetting("questionCount");
    let questionCountOfSection = Math.ceil(questionCount / sections.length);
    let questions = [];
    sections.forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < Math.min(questionCountOfSection, section.maxCount || questionCount)) {
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
    questions = RandomUtil.pickRandomItems(questions, Math.min(questionCount, questions.length));
    for (let i = 0; questions.length < questionCount; i++) {
      if (i >= questions.length) i = 0;
      questions.push(questions[i]);
    }
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
    let hour = Math.floor(value / (60 * 60));
    let minute = Math.floor(value % (60 * 60) / 60);
    let second = value % 60;

    hour = hour === 0 ? 12 : hour;
    let result = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    if (!disableSeconds) result += `:${second.toString().padStart(2, "0")}`;

    return result;
  }
}