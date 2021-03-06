import React, { Component } from "react";
import i18n from "i18next";
import Countdown from "./countdown.jsx";
import NumericKeypad from "./numeric-keypad.jsx";

export default class QuizAttempt extends Component {

  constructor(props) {
    super(props);

    this.questionBank = props.questionBank;
    let answerMethod = this.questionBank.getSetting("anwser-method");
    let timeoutSeconds = this.questionBank.getSetting("timeoutSeconds");

    this.results = [];
    this.state = {
      description: "",
      answer: {},
      choices: [],
      reply: "",
      timeoutSeconds: timeoutSeconds,
      answerMethod: answerMethod == null ? "choice" : answerMethod[0].value,
      count: this.questionBank.getCount(),
      cursor: this.questionBank.getCursor()
    };
    this.countdown = React.createRef();
    this.numericKeypad = React.createRef();
  }

  componentDidMount() {
    this.nextQuestion();
  }

  componentWillUnmount() {
    this.countdown.current.pause();
  }

  nextQuestion = () => {
    this.setState({ correct: null });

    let question = this.questionBank.nextQuestion();
    if (question === null) {
      this.props.onFinish(this.results);
      this.results = [];
      return;
    }

    this.state.choices.splice(0, this.state.choices.length);
    question.reply = "";
    question.count = this.questionBank.getCount();
    question.cursor = this.questionBank.getCursor();
    this.setState(question);
    this.countdown.current.reset();
    if (this.numericKeypad.current)
      this.numericKeypad.current.clear();
  }

  checkAnswer = (reply) => {
    reply = reply == null ? "" : reply;
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
      reply: this.questionBank.convertText(reply, this.state.disableSecondhand),
      correct: this.questionBank.checkAnswer(reply),
      duration: this.countdown.current.getDuration()
    };
    this.results.push(result);
  }

  onCountdownChanged = (value) => {
    this.setState({ countdown: value });
  }

  renderSwitch = () => {
    switch (this.state.answerMethod) {
      case "filling":
        return <NumericKeypad ref={this.numericKeypad}
          onChanged={value => this.setState({ reply: value })}
          onConfirm={value => this.checkAnswer(parseInt(value))} />
      default:
        return <ul className="choices">
          {this.state.choices.map((choice, i) =>
            <li key={i} onClick={() => this.checkAnswer(choice.value)} ><span>{choice.text}</span></li>
          )}
        </ul>
    }
  }

  render() {
    return (
      <div className={`answer-method ${this.state.answerMethod}`}>
        <span className="questionNumber">{`${this.state.cursor}/${this.state.count}`}</span>
        <div className={`question ${this.state.countdown < 3 && this.state.correct !== false && "blink"}`}>
          {this.state.description} {this.state.answerMethod === "filling" && <span>{`= ${this.state.reply}`}</span>}
        </div>
        {this.state.correct === false
          ? <div>
            <p>{this.state.reply === "" ? i18n.t("timeout") : i18n.t("wrong-answer") } {i18n.t("answer")}：{this.state.answer.text}</p>
            <span className="btn large blue" onClick={() => this.nextQuestion()}>{i18n.t("next")}</span>
          </div>
          : this.renderSwitch()}
        <Countdown ref={this.countdown}
          seconds={this.state.timeoutSeconds}
          timeout={() => this.checkAnswer(this.state.reply)}
          onChanged={value => this.onCountdownChanged(value)} />
      </div>
    );
  }
}