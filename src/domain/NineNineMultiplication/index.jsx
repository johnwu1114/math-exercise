import "./style.css";
import React, { Component } from "react";
import Countdown from "../../components/countdown.jsx";
import ResultReport from "./result-report.jsx";

export default class NineNineMultiplication extends Component {
  selectionCount = 6;
  countdownSeconds = 10;

  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer: "",
      selections: [],
      showReport: false,
      results: []
    };
    this.countdown = React.createRef();

    this.questions = [];
    this.results = [];

    for (let i = 2; i <= 9; i++)
      for (let j = 2; j <= 9; j++) {
        this.questions.push({
          question: `${i} x ${j}`,
          answer: i * j
        });
      }
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion = () => {
    if (this.questions.length === 0) {
      this.setState({ showReport: true });
      this.setState({ results: this.results });
      return;
    }

    let index = Math.floor(Math.random() * this.questions.length);
    let item = this.questions.splice(index, 1)[0];
    this.setState(item);
    this.createSelections(item.answer);
    this.countdown.current.reset();
  }

  createSelections = (answer) => {
    this.state.selections.splice(0, this.state.selections.length);

    let seeds = [];
    for (let i = Math.max(2, answer - 20); i < answer + 20; i++) {
      if (i !== answer) seeds.push(i);
    }

    let selections = [];
    for (let i = 1; i < this.selectionCount; i++) {
      let index = Math.floor(Math.random() * seeds.length);
      let selection = seeds.splice(index, 1)[0];
      selections.push(selection);
    }
    selections.splice(Math.floor(Math.random() * 5), 0, answer);

    this.setState({ selections: selections });
  }

  answer = (reply) => {
    this.countdown.current.pause();

    if (reply !== this.state.answer) {
      this.questions.push({
        question: this.state.question,
        answer: this.state.answer
      });
    }
    this.logAnswer(reply)

    this.nextQuestion();
  }

  logAnswer = (reply) => {
    let pass = reply === this.state.answer;
    let result = {
      question: this.state.question,
      answer: this.state.answer,
      reply: reply,
      timeout: reply ? false : true,
      pass: pass,
      duration: this.countdown.current.getDuration()
    };
    this.results.push(result);
  }

  onClose = () => {
    this.props.onClose();
  }

  render() {
    return (
      <div>
        <div className="header">
          <span className="close" onClick={() => this.onClose()}>x</span>
        </div>
        <div className="question">
          {this.state.question}
        </div>
        <ul className="selections">
          {this.state.selections.map((selection, i) =>
            <li key={i} onClick={() => this.answer(selection)} >{selection}</li>
          )}
        </ul>
        <Countdown ref={this.countdown} max={this.countdownSeconds} timeout={() => this.answer()} />
        {this.state.showReport && <ResultReport onClose={() => this.onClose()} results={this.state.results} />}
      </div>
    );
  }
}