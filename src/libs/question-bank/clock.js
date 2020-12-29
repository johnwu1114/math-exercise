import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";
import Clock from "../../components/clock.jsx";

export default class ClockQuestionBank extends QuestionBankBase {
  questionCount = 10;

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

  generateQuestions = (sections) => {
    let totalSeconds = 12 * 60 * 60;
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      let hashMap = new Map();
      while (hashMap.size < this.questionCount) {
        let disableSecondhand = section.intervalSeconds !== 5;
        let random = RandomUtil.getRandomInt(totalSeconds);
        random = random - random % section.intervalSeconds;
        let key = this.convertSecondToHHMMSS(random, disableSecondhand);
        hashMap.set(key, {
          description: <Clock hhmmss={key} disableSecondhand={disableSecondhand.toString()} />,
          answer: random,
          answerRange: section.answerRange,
          intervalSeconds: section.intervalSeconds,
          disableSecondhand: disableSecondhand
        });
      }
      hashMap.forEach((value) => {
        questions.push(value);
      });
    });
    return questions;
  }

  generateChoices = (question) => {
    let answer = question.answer;
    let answerRange = question.answerRange * question.intervalSeconds;
    let intervalSeconds = question.intervalSeconds;
    let seeds = [];
    for (let i = Math.max(0, answer - answerRange); i < answer + answerRange; i += intervalSeconds) {
      if (i !== answer) seeds.push({
        text: this.convertSecondToHHMMSS(i, question.disableSecondhand),
        value: i
      });
    }

    let randomCount = this.selectionCount - 1;
    let choices = RandomUtil.pickRandomItems(seeds, randomCount);
    choices.splice(RandomUtil.getRandomInt(randomCount), 0, {
      text: this.convertSecondToHHMMSS(answer, question.disableSecondhand),
      value: answer
    });
    return choices;
  }

  convertSecondToHHMMSS = (totalSeconds, disableSeconds) => {
    let hour = Math.floor(totalSeconds / (60 * 60)) + 1;
    let minute = Math.floor(totalSeconds % (60 * 60) / 60);
    let second = totalSeconds % 60;
    let result = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    if (!disableSeconds) result += `:${second.toString().padStart(2, "0")}`;

    return result;
  }
}