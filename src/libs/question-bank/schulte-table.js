import RandomUtil from "../utils/random.js";

export default class SchulteTableQuestionBank {

  characterOptions = {
    zhuyin: "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ",
    blockLetter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    smallLetter: "abcdefghijklmnopqrstuvwxyz",
    hiragana: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん",
    katakana: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  };

  getName = () => {
    return "舒爾特方格";
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

  generateQuestions = (sections) => {
    // numeral
    let characters = this.characters = this.getCharacters("numeral");
    let squareRoot = Math.min(sections[0].value, Math.ceil(Math.sqrt(characters.length)));
    let count = Math.pow(squareRoot, 2);

    let questions = [];

    for (let i = 1; i <= count; i++) {
      let char = characters[i - 1];
      questions.push(char == null ? null : {
        text: char,
        value: i
      });
    }

    return RandomUtil.pickRandomItems(questions, count);
  }

  setQuestions = (questions) => {
    this.questions = questions || [];
  }

  nextQuestion = () => {
    this.cursor = 0;
    return this.questions;
  }

  checkAnswer = (reply) => {
    return reply != null && reply === this.cursor;
  }

  convertText = (value) => {
    return value.toString();
  }

  getComponentName = () => {
    return "SchulteTable";
  }

  nextCursor = () => {
    if (this.cursor >= this.questions.length) return null;
    let current = this.cursor++;
    return {
      text: this.characters[current],
      value: current
    };
  }

  getAnswerMethods = () => {
    return [];
  }

  getCharacters = (name) => {
    let characters = this.characterOptions[name];
    if (characters == null) return Array.from({length: Math.pow(9, 2)}, (x, i) => i + 1);;
    return characters.split("");
  }
}