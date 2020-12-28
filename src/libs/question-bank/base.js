export default class QuestionBankBase {
    selectionCount = 6;
  
    generateChoices = (question) => {
      let answer = question.answer;
      let answerRange = question.answerRange || 20;
      let seeds = [];
      for (let i = Math.max(2, answer - answerRange); i < answer + answerRange; i++) {
        if (i !== answer) seeds.push(i);
      }
  
      let choices = [];
      for (let i = 1; i < this.selectionCount; i++) {
        let index = Math.floor(Math.random() * seeds.length);
        let choice = seeds.splice(index, 1)[0];
        choices.push(choice);
      }
      choices.splice(Math.floor(Math.random() * 5), 0, answer);
  
      return choices;
    }
  
    addQuestions = (questions) => {
      this.questions = this.questions || [];
      this.questions = this.questions.concat(questions || []);
    }
  
    nextQuestion = () => {
      if (this.questions.length === 0) return null;
      let index = Math.floor(Math.random() * this.questions.length);
      let question = this.questions.splice(index, 1)[0];
      question.choices = this.generateChoices(question);
      return this.currentQuestion = question;
    }
  
    checkAnswer = (reply) => {
      return reply === this.currentQuestion.answer;
    }
  }