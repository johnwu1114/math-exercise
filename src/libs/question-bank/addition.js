import QuestionBankBase from "./base.js";

export default class AdditionQuestionBank extends QuestionBankBase {
  selectionCount = 6;
  questionCount = 20;

  getSections = () => {
    return [{
        text: "10 以內加法",
        minimum: 1,
        maxSummation: 10,
        answerRange: 10
      },
      {
        text: "20 以內加法",
        minimum: 1,
        maxSummation: 20,
        answerRange: 10
      },
      {
        text: "兩位數加法",
        minimum: 11,
        maxSummation: 99,
        answerRange: 20
      }
    ];
  }

  generateQuestions = (sections) => {
    let questions = [];
    (sections || this.getSections())
    .forEach(section => {
      for (let i = section.minimum; i <= section.maxSummation; i++) {
        for (let j = i; j <= section.maxSummation - i; j++) {
          questions.push({
            question: `${i} + ${j}`,
            answer: i + j,
            answerRange: section.answerRange
          });
          if (i !== j) {
            questions.push({
              question: `${j} + ${i}`,
              answer: i + j,
              answerRange: section.answerRange
            });
          }
        }
      }
    });
    return questions;
  }
}