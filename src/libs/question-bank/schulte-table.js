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

  getOptions = () => {
    let sections = this.getSections();
    sections[0].selected = true;

    return [
      {
        title: "請選擇",
        name: "section",
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
            value: "zhuyin"
          },
          {
            text: "ABC",
            value: "blockLetter"
          },
          {
            text: "abc",
            value: "smallLetter"
          },
          {
            text: "あいう",
            value: "hiragana"
          },
          {
            text: "アイウ",
            value: "katakana"
          }
        ]
      }
    ];
  }

  setSettings = (options) =>{
    this.settings = options;
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
    let characterName = this.settings.filter(x => x.name === "character")[0].selections[0].value;
    let characters = this.characters = this.getCharacters(characterName);
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