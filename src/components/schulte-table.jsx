import "../styles/schulte-table.css";
import React, { Component } from "react";
import Timer from "../libs/utils/timer";

export default class SchulteTable extends Component {

  constructor(props) {
    super(props);

    this.questionBank = props.questionBank;
    this.results = [];
    this.timer = new Timer();

    this.state = {
      numbers: this.questionBank.nextQuestion(),
      cursor: this.questionBank.nextCursor(),
      clicked: {}
    };
  }

  componentDidMount() {
    this.timer.start();
  }

  checkAnswer = (reply) => {
    this.timer.stop();
    clearTimeout(this.effectId);
    let sytle = "incorrect";
    let cursor = this.state.cursor;
    let correct = this.questionBank.checkAnswer(reply);
    this.logAnswer(reply);

    if (correct) {
      sytle = "correct";
      cursor = this.questionBank.nextCursor();
      if (cursor === null) {
        this.props.onFinish(this.results);
        this.results = [];
        return;
      }
    }

    this.setState({
      clicked: {
        num: reply,
        sytle: sytle
      },
      cursor: cursor
    });
    this.effectId = setTimeout(() => {
      this.setState({ clicked: {} });
    }, 500);
    this.timer.restart();
  }

  logAnswer = (reply) => {
    let squareRoot = Math.sqrt(this.state.numbers.length);
    let result = {
      question: {
        description: `${squareRoot} x ${squareRoot} 格`,
        answer: {
          text: `順序 ${this.state.cursor}`
        }
      },
      reply: {
        text: reply.toString()
      },
      correct: this.questionBank.checkAnswer(reply),
      duration: this.timer.getDuration()
    };
    this.results.push(result);
  }

  render() {
    const { clicked } = this.state;
    return (
      <div>
        <div className="schulte-table">
          <div className="cursor">下一個: {this.state.cursor}</div>
          <div className={`numbers size-${this.state.numbers.length}`}>
            {this.state.numbers.map((num) =>
              <div key={num}
                className={`cell ${(clicked.num === num ? clicked.sytle : "")}`}
                onClick={() => this.checkAnswer(num)}><span>{num}</span></div>
            )}
          </div>
        </div>
      </div >
    );
  }
}