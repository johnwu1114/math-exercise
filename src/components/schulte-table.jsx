import "../styles/schulte-table.css";
import React, { Component } from "react";
import RandomUtil from "../libs/utils/random.js";

export default class SchulteTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      clicked: {},
      cursor: 1
    };

    let count = 9;
    let numbers = [];
    for (let i = 1; i <= count; i++) {
      numbers.push(i);
    }

    this.state.numbers = RandomUtil.pickRandomItems(numbers, count);
  }

  checkAnswer = (reply) => {
    clearTimeout(this.timeoutId);
    let sytle = "incorrect";
    let cursor = this.state.cursor;
    let correct = reply === cursor;

    if (correct) {
      sytle = "correct";
      cursor++;
      if (cursor > this.state.numbers.length) {
        console.log("Finish");
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
    this.timeoutId = setTimeout(() => {
      this.setState({ clicked: {} });
    }, 500);
  }

  logAnswer = (reply) => {
    let squareRoot = Math.sqrt(this.state.numbers.length);
    let result = {
      question: {
        description: `${squareRoot} x ${squareRoot}`,
        answer: {
          text: this.state.cursor.toString()
        }
      },
      reply: {
        text: reply.toString()
      },
      correct: reply === this.state.cursor,
      duration: this.countdown.current.getDuration()
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