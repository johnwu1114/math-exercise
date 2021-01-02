import React, { Component } from "react";
import Countdown from "./countdown.jsx";
import NumericKeypad from "./numeric-keypad.jsx";

export default class QuizAttempt extends Component {
  countdownSeconds = 10;

  constructor(props) {
    super(props);

    this.questionBank = props.questionBank;
    this.results = [];

    this.state = {
      description: "",
      answer: {},
      choices: [],
      reply: ""
    };
    this.countdown = React.createRef();
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion = () => {
    this.setState({
      correct: null
    });

    let question = this.questionBank.nextQuestion();
    if (question === null) {
      this.props.onFinish(this.results);
      this.results = [];
      return;
    }

    this.state.choices.splice(0, this.state.choices.length);
    question.reply = "";
    this.setState(question);
    this.countdown.current.reset();
  }

  checkAnswer = (reply) => {
    reply = reply || "";
    this.countdown.current.pause();
    let correct = this.questionBank.checkAnswer(reply);
    this.logAnswer(reply);

    this.setState({
      correct: correct,
      reply: reply
    });
    if (correct) this.nextQuestion();
  }

  logAnswer = (reply) => {
    let result = {
      question: this.state,
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
      <div className="filling">
        <div className={`question ${this.state.countdown < 3 && this.state.correct !== false && "blink"}`}>
          {this.state.description} {`= ${this.state.reply}`}
        </div>
        {this.state.correct === false
          ? <div>
            <p>
              {this.state.reply === "" ? "時間到！" : "答錯了！"} 答案是：{this.state.answer.text}
            </p>
            <span className="btn large blue" onClick={() => this.nextQuestion()}>下一題</span>
          </div>
          : <NumericKeypad
            onChanged={value => this.setState({ reply: value })}
            onConfirm={value => this.checkAnswer(parseInt(value))} />
          // : <ul className="choices">
          //   {this.state.choices.map((choice, i) =>
          //     <li key={i} onClick={() => this.checkAnswer(choice.value)} >{choice.text}</li>
          //   )}
          // </ul>}
        }
        <Countdown ref={this.countdown}
          seconds={this.countdownSeconds}
          timeout={() => this.checkAnswer()}
          onChanged={value => this.onCountdownChanged(value)} />
      </div>
    );
  }
}