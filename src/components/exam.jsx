import "../styles/exam.css";
import React, { Component } from "react";
import Countdown from "./countdown.jsx";
import ExamResult from "./exam-results.jsx";

export default class Exam extends Component {
  countdownSeconds = 10;

  constructor(props) {
    super(props);

    this.strategy = props.strategy;
    this.countdown = React.createRef();
    this.results = [];

    this.state = {
      question: "",
      answer: "",
      selections: []
    };
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion = () => {
    this.setState({ correct: null });

    let question = this.strategy.nextQuestion();
    if (question === null) {
      this.setState({
        showExamResult: true,
        results: this.results
      });
      return;
    }

    this.state.selections.splice(0, this.state.selections.length);
    this.setState(question);
    this.countdown.current.reset();
  }

  checkAnswer = (reply) => {
    this.countdown.current.pause();

    let correct = this.strategy.checkAnswer(reply);
    this.setState({ correct: correct });
    this.logAnswer(reply);

    if (correct) this.nextQuestion();
  }

  logAnswer = (reply) => {
    let result = {
      question: this.state.question,
      answer: this.state.answer,
      reply: reply,
      correct: this.strategy.checkAnswer(reply),
      duration: this.countdown.current.getDuration()
    };
    this.results.push(result);
  }

  onReview = () => {
    let questions = this.results
      .filter(x => !x.correct)
      .map(x => {
        return {
          question: x.question,
          answer: x.answer
        }
      });
    for (let i = 0; i < 3; i++)
      this.strategy.addQuestions(questions);
    this.state.results.splice(0, this.state.results.length);
    this.setState({
      showExamResult: false,
      results: this.results
    });
    this.nextQuestion();
  }

  onClose = () => {
    this.props.onClose();
  }

  onCountdownChanged = (value) => {
    this.setState({ countdown: value });
  }

  render() {
    return (
      <div>
        <div className="header">
          {!this.state.showExamResult && <span className="close" onClick={() => this.onClose()}>x</span>}
        </div>
        <div className={`question ${this.state.countdown < 3 && this.state.correct !== false && "blink"}`}>
          {this.state.question} {this.state.correct === false && `= ${this.state.answer}`}
        </div>
        {this.state.correct === false
          ? <p>答錯了！<span className="btn next" onClick={() => this.nextQuestion()}>下一題</span></p>
          : <ul className="selections">
            {this.state.selections.map((selection, i) =>
              <li key={i} onClick={() => this.checkAnswer(selection)} >{selection}</li>
            )}
          </ul>}
        <Countdown ref={this.countdown}
          max={this.countdownSeconds}
          timeout={() => this.checkAnswer()}
          onChanged={value => this.onCountdownChanged(value)} />
        {this.state.showExamResult &&
          <ExamResult
            results={this.state.results}
            onReview={() => this.onReview()}
            onClose={() => this.onClose()} />}
      </div>
    );
  }
}