import "../styles/schulte-table.css";
import React, { Component } from "react";
import Timer from "../libs/utils/timer";

export default class SchulteTable extends Component {

  constructor(props) {
    super(props);

    this.questionBank = props.questionBank;
    this.results = [];
    this.timer = new Timer(this.updateTime);
    this.answerTimer = new Timer();

    this.state = {
      characters: this.questionBank.nextQuestion(),
      cursor: this.questionBank.nextCursor(),
      clicked: {},
      time: 0
    };
  }

  componentDidMount() {
    this.timer.start();
    this.answerTimer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
    this.answerTimer.stop();
  }

  updateTime = (seconds) => {
    this.setState({ time: `${seconds.toFixed(1)}s` });
  }

  checkAnswer = (reply) => {
    this.answerTimer.stop();
    clearTimeout(this.effectId);
    let sytle = "incorrect";
    let cursor = this.state.cursor;
    let correct = this.questionBank.checkAnswer(reply.value);
    this.logAnswer(reply);

    if (correct) {
      sytle = "correct";
      cursor = this.questionBank.nextCursor();
      if (cursor === null) {
        this.timer.stop();
        this.setState({ time: null });
        this.props.onFinish(this.results);
        this.results = [];
        return;
      }
    }

    this.setState({
      clicked: {
        value: reply.value,
        sytle: sytle
      },
      cursor: cursor
    });
    this.effectId = setTimeout(() => {
      this.setState({ clicked: {} });
    }, 500);
    this.answerTimer.restart();
  }

  logAnswer = (reply) => {
    let squareRoot = Math.sqrt(this.state.characters.length);
    let result = {
      question: {
        description: `${squareRoot} x ${squareRoot} 格`,
        answer: {
          text: `順序 ${this.state.cursor.text}`
        }
      },
      reply: reply.text,
      correct: this.questionBank.checkAnswer(reply.value),
      duration: this.answerTimer.getDuration()
    };
    this.results.push(result);
  }

  render() {
    const { clicked } = this.state;
    return (
      <div>
        <div className="schulte-table">
          <div className="cursor">下一個：<b>{this.state.cursor.text}</b></div>
          <div className="time">{this.state.time}</div>
          <div className={`characters size-${this.state.characters.length}`}>
            {this.state.characters.map((character) =>
              character && <div key={character.value}
                className={`cell ${(clicked.value === character.value ? clicked.sytle : "")}`}
                onClick={() => this.checkAnswer(character)}><span>{character.text}</span></div>
            )}
          </div>
        </div>
      </div >
    );
  }
}