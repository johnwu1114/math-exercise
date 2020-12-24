import React, { Component } from "react";
import Quiz from "./components/quiz.jsx";
import NineNineMultiplication from "./libs/nine-nine-multiplication.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false };
  }

  start = () => {
    this.setState({
      isStart: true,
      strategy: new NineNineMultiplication()
    });
  }

  render() {
    return (
      <div className="app">
        { this.state.isStart
          ? <Quiz strategy={this.state.strategy} onClose={() => this.setState({ isStart: false })} />
          : <div><h1>九九乘法練習</h1><span className="btn-start" onClick={() => this.start()}>開始</span></div>
        }
      </div>
    );
  }
}