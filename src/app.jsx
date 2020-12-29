import React, { Component } from "react";
import Quiz from "./components/quiz.jsx";
import AdditionQuestionBank from "./libs/question-bank/addition.js";
import SubtractionQuestionBank from "./libs/question-bank/subtraction.js";
import MultiplicationQuestionBank from "./libs/question-bank/multiplication.js";
import Clock from "./components/clock.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false };
  }

  start = (questionBank) => {
    this.setState({
      isStart: true,
      questionBank: questionBank
    });
  }

  render() {
    return (
      <div className="app">
        <Clock />
        { this.state.isStart
          ? <Quiz questionBank={this.state.questionBank} onClose={() => this.setState({ isStart: false })} />
          : <ul>
            <li className="btn large green" onClick={() => this.start(new AdditionQuestionBank())}>
              加法練習
          </li>
            <li className="btn large green" onClick={() => this.start(new SubtractionQuestionBank())}>
              減法練習
            </li>
            <li className="btn large green" onClick={() => this.start(new MultiplicationQuestionBank())}>
              9 x 9 乘法練習
            </li>
            <li className="btn large green" onClick={() => this.start(new MultiplicationQuestionBank(2))}>
              19 x 19 乘法練習
            </li>
          </ul>

        }
      </div>
    );
  }
}