import RandomUtil from "../utils/random.js";
import QuestionBankBase from "./base.js";

export default class SchulteTableQuestionBank extends QuestionBankBase {

  constructor() {
    super();
    this.settings["title"] = "舒爾特方格";
    this.settings["route"] = "schulte-table";
    this.settings["component"] = "SchulteTable";
    this.settings["enableReview"] = false;
  }

  getOptions = () => {
    let sections = this.getSections();
    sections[0].selected = true;

    return [
      {
        title: "請選擇",
        name: "sections",
        type: "single-choice",
        selections: sections
      },
      {
        title: "文字",
        name: "character",
        type: "single-choice",
        selections: [{
            text: "123",
            value: "numeral",
            selected: true
          },
          {
            text: "ㄅㄆㄇ",
            value: "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ"
          },
          {
            text: "ABC",
            value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          },
          {
            text: "abc",
            value: "abcdefghijklmnopqrstuvwxyz"
          },
          {
            text: "あいう",
            value: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
          },
          {
            text: "アイウ",
            value: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
          }
        ]
      }
    ];
  }

  getSections = () => {
    let sections = [];
    for (let i = 3; i <= 9; i++) {
      sections.push({
        text: `${i} x ${i} 格`,
        value: i
      });
    }
    return sections;
  }

  initQuestions = () => {
    let section = this.getSetting("sections")[0].value;
    let characters = this.characters = this.getCharacters(this.getSetting("character")[0].value);
    let squareRoot = Math.min(section, Math.ceil(Math.sqrt(characters.length)));
    let count = Math.pow(squareRoot, 2);

    let questions = [];
    for (let i = 1; i <= count; i++) {
      let char = characters[i - 1];
      questions.push(char == null ? null : {
        text: char,
        value: i
      });
    }

    this.setQuestions(RandomUtil.pickRandomItems(questions, count));
  }

  nextQuestion = () => {
    this.cursor = 0;
    return this.questions;
  }

  checkAnswer = (reply) => {
    return reply != null && reply === this.cursor;
  }

  nextCursor = () => {
    if (this.cursor >= this.questions.length) return null;
    let current = this.cursor++;
    return {
      text: this.characters[current],
      value: current
    };
  }

  getCharacters = (str) => {
    if (str === "numeral") return Array.from({length: Math.pow(9, 2)}, (x, i) => i + 1);;
    return str.split("");
  }
}