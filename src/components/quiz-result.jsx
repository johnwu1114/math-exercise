import React, { Component } from "react";

export default class QuizResult extends Component {
  constructor(props) {
    super(props);

    let correct = 0;
    let incorrect = 0;
    let timeout = 0;
    let duration = 0;
    let results = this.props.results || [];
    results.forEach(result => {
      if (result.correct) correct++;
      else if (result.reply) incorrect++;
      else timeout++;
      duration += result.duration;
    });
    this.state = {
      results: results,
      correct: correct,
      incorrect: incorrect,
      timeout: timeout,
      avgDuration: results.length && duration / results.length,
      duration: duration,
      score: results.length && Math.floor(correct / results.length * 100),
    };
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => this.props.onClose()}>x</span>
          <table>
            <tbody>
              <tr>
                <td style={{ width: "40%", fontSize: "calc(10px + 10vmin)", textAlign: "right" }} rowSpan="5">{this.state.score} 分</td>
                <td style={{ width: "calc(80px + 10vmin)" }}>答對次數：</td><td>{this.state.correct}</td>
              </tr>
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
              {this.state.results.map((result, i) => result.correct ||
                <tr key={i} className={result.correct ? "correct" : "incorrect"}>
                  <td><b /></td>
                  <td>{result.question.description}</td>
                  <td>{result.question.answer.text}</td>
                  <td>{result.reply.text || "--"}</td>
                  <td>{result.duration.toFixed(1)}</td>
                </tr>
              )}
            </tbody>
          </table>
          <span className="btn" onClick={() => this.props.onClose()}>關閉</span>
          {this.state.incorrect >= 3 && <span className="btn blue" onClick={() => this.props.onReview()}>複習</span>}
        </div>
      </div>
    );
  }
}