import "./style.css";
import React, { Component } from "react";

export default class ResultReport extends Component {
  constructor(props) {
    super(props);

    let correct = 0;
    let incorrect = 0;
    let timeout = 0;
    let duration = 0;
    this.props.results.forEach(result => {
      if (result.pass) correct++;
      else if (result.reply) incorrect++;
      else timeout++;
      duration += result.duration;
    });
    this.state = {
      results: this.props.results,
      correct: correct,
      incorrect: incorrect,
      timeout: timeout,
      avgDuration: duration / this.props.results.length,
      duration: duration
    };
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => this.props.onClose()}>x</span>
          <table>
            <tbody>
              <tr><td style={{ width: "50%" }}>答對次數：</td><td>{this.state.correct}</td></tr>
              <tr><td>答錯次數：</td><td>{this.state.incorrect}</td></tr>
              <tr><td>逾時次數：</td><td>{this.state.timeout}</td></tr>
              <tr><td>平均耗時：</td><td>{this.state.avgDuration.toFixed(1)} 秒</td></tr>
              <tr><td>全部耗時：</td><td>{this.state.duration.toFixed(1)} 秒</td></tr>
            </tbody>
          </table>
          <hr />
          <table>
            <thead>
              <tr>
                <th style={{ width: "5%" }}></th>
                <th>題目</th>
                <th style={{ width: "20%" }}>解答</th>
                <th style={{ width: "20%" }}>作答</th>
                <th style={{ width: "25%" }}>耗時(秒)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.map((result, i) =>
                <tr key={i}>
                  <td>{result.pass ? <b className="pass">O</b> : <b className="fail">X</b>}</td>
                  <td>{result.question}</td>
                  <td>{result.answer}</td>
                  <td>{result.reply || "--"}</td>
                  <td>{result.duration.toFixed(1)}</td>
                </tr>
              )}
            </tbody>
          </table>
          <span className="btn-close" onClick={() => this.props.onClose()}>關閉</span>
        </div>
      </div>
    );
  }
}