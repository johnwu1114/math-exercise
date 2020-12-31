import React, { Component } from "react";
import Quiz from "./components/quiz.jsx";
import SchulteTableQuestionBank from "./libs/question-bank/schulte-table.js";
import AdditionQuestionBank from "./libs/question-bank/addition.js";
import SubtractionQuestionBank from "./libs/question-bank/subtraction.js";
import MultiplicationQuestionBank from "./libs/question-bank/multiplication.js";
import ClockQuestionBank from "./libs/question-bank/clock.js";

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
        { this.state.isStart
          ? <Quiz questionBank={this.state.questionBank} onClose={() => this.setState({ isStart: false })} />
          : <div>
            <h1>數學練習小程式</h1>
            <ul>
              <li className="btn green" onClick={() => this.start(new SchulteTableQuestionBank())}>
                舒爾特方格
              </li>
              <li className="btn green" onClick={() => this.start(new AdditionQuestionBank())}>
                加法練習
              </li>
              <li className="btn green" onClick={() => this.start(new SubtractionQuestionBank())}>
                減法練習
              </li>
              <li className="btn green" onClick={() => this.start(new MultiplicationQuestionBank())}>
                9 x 9 乘法練習
              </li>
              <li className="btn green" onClick={() => this.start(new MultiplicationQuestionBank(2))}>
                19 x 19 乘法練習
              </li>
              <li className="btn green" onClick={() => this.start(new ClockQuestionBank())}>
                時鐘練習
              </li>
            </ul>
          </div>}
      </div>
    );
  }
}