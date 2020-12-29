import React, { Component } from "react";
import Countdown from "./countdown.jsx";

export default class QuizAttempt extends Component {
  countdownSeconds = 10;

  constructor(props) {
    super(props);

    this.questionBank = props.questionBank;
    this.results = [];

    this.state = {
      description: "",
      answer: "",
      choices: []
    };
    this.countdown = React.createRef();
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion = () => {
    this.setState({
      correct: null,
      timeout: null
    });

    let question = this.questionBank.nextQuestion();
    if (question === null) {
      this.props.onFinish(this.results);
      this.results = [];
      return;
    }

    this.state.choices.splice(0, this.state.choices.length);
    this.setState(question);
    this.countdown.current.reset();
  }

  checkAnswer = (reply) => {
    this.countdown.current.pause();
    let correct = this.questionBank.checkAnswer(reply);
    this.setState({
      correct: correct,
      timeout: reply == null
    });
    this.logAnswer(reply);

    if (correct) this.nextQuestion();
  }

  logAnswer = (reply) => {
    let result = {
      description: this.state.description,
      answer: this.state.answer,
      reply: reply,
      correct: this.questionBank.checkAnswer(reply),
      duration: this.countdown.current.getDuration()
    };
    this.results.push(result);
  }

  onCountdownChanged = (value) => {
    this.setState({ countdown: value });
  }

  render() {
    return (
      <div>
        <div className={`question ${this.state.countdown < 3 && this.state.correct !== false && "blink"}`}>
          {this.state.description} {this.state.correct === false && `= ${this.state.answer}`}
        </div>
        {this.state.correct === false
          ? <p>{this.state.timeout ? "時間到！" : "答錯了！"}<span className="btn large blue" onClick={() => this.nextQuestion()}>下一題</span></p>
          : <ul className="choices">
            {this.state.choices.map((choice, i) =>
              <li key={i} onClick={() => this.checkAnswer(choice)} >{choice}</li>
            )}
          </ul>}
        <Countdown ref={this.countdown}
          seconds={this.countdownSeconds}
          timeout={() => this.checkAnswer()}
          onChanged={value => this.onCountdownChanged(value)} />
      </div>
    );
  }
}