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
    this.state = {
      isStart: false,
      questionBanks: [
        new SchulteTableQuestionBank(),
        new AdditionQuestionBank(),
        new SubtractionQuestionBank(),
        new MultiplicationQuestionBank(),
        new MultiplicationQuestionBank(2),
        new ClockQuestionBank()
      ]
    };
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
              {this.state.questionBanks.map((questionBank, i) =>
                <li key={i} className="btn green" onClick={() => this.start(questionBank)}>
                  {questionBank.getTitle()}
                </li>)}
            </ul>
          </div>}
      </div>
    );
  }
}