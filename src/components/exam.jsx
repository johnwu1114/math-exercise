import "../styles/exam.css";
import React, { Component } from "react";
import Countdown from "./countdown.jsx";
import ExamResult from "./exam-results.jsx";

export default class Exam extends Component {
  countdownSeconds = 10;

  constructor(props) {
    super(props);

    this.strategy = props.strategy;
    this.enableRepeat = props.enableRepeat || false;
    if (this.enableRepeat) this.mistakes = [];
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
    this.setState({ pass: null });

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

    let pass = this.strategy.checkAnswer(reply);
    this.setState({ pass: pass });
    this.logAnswer(reply);

    if (pass) this.nextQuestion();
    else this.fail();
  }

  fail = () => {
    if (this.enableRepeat) {
      this.mistakes.push({
        question: this.state.question,
        answer: this.state.answer
      });
    }
  }

  logAnswer = (reply) => {
    let result = {
      question: this.state.question,
      answer: this.state.answer,
      reply: reply,
      pass: this.strategy.checkAnswer(reply),
      duration: this.countdown.current.getDuration()
    };
    this.results.push(result);
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
        <div className={`question ${this.state.countdown < 3 && this.state.pass !== false && "blink"}`}>
          {this.state.question} {this.state.pass === false && `= ${this.state.answer}`}
        </div>
        {this.state.pass === false
          ? <p>答錯了！<span className="btn-next" onClick={() => this.nextQuestion()}>下一題</span></p>
          : <ul className="selections">
            {this.state.selections.map((selection, i) =>
              <li key={i} onClick={() => this.checkAnswer(selection)} >{selection}</li>
            )}
          </ul>}
        <Countdown ref={this.countdown}
          max={this.countdownSeconds}
          timeout={() => this.checkAnswer()}
          onChanged={value => this.onCountdownChanged(value)} />
        {this.state.showExamResult && <ExamResult onClose={() => this.onClose()} results={this.state.results} />}
      </div>
    );
  }
}