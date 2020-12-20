import "./style.css";
import React, { Component } from "react";
import NineNineMultiplication from "../NineNineMultiplication/index.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false };
  }

  render() {
    return (
      <div className="app">
        { this.state.isStart
          ? <NineNineMultiplication onClose={() => this.setState({ isStart: false })} />
          : <span className="btn-start" onClick={() => this.setState({ isStart: true })}>開始</span>
        }
      </div>
    );
  }
}