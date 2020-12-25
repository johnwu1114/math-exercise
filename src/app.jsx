import React, { Component } from "react";
import Quiz from "./components/quiz.jsx";
import NineNineMultiplication from "./libs/nine-nine-multiplication.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false };
  }

  start = (strategy) => {
    this.setState({
      isStart: true,
      strategy: strategy
    });
  }

  render() {
    return (
      <div className="app">
        { this.state.isStart
          ? <Quiz strategy={this.state.strategy} onClose={() => this.setState({ isStart: false })} />
          : <span className="btn green" onClick={() => this.start(new NineNineMultiplication())}>九九乘法練習</span>
        }
      </div>
    );
  }
}