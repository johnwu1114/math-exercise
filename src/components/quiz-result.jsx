import React, { Component } from "react";
import i18n from "i18next";

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
              <tr className="correct"><td>{i18n.t("number-of-correct")}：</td><td>{this.state.correct}</td></tr>
              <tr className={this.state.incorrect > 0 ? "incorrect" : ""}><td>{i18n.t("number-of-wrong")}：</td><td>{this.state.incorrect}</td></tr>
              {this.state.timeout > 0 && <tr className="incorrect"><td>{i18n.t("number-of-timeout")}：</td><td>{this.state.timeout}</td></tr>}
              <tr><td>{i18n.t("avg-duration")}：</td><td>{this.state.avgDuration.toFixed(1)} {i18n.t("seconds")}</td></tr>
              <tr><td>{i18n.t("total-duration")}：</td><td>{this.state.duration.toFixed(1)} {i18n.t("seconds")}</td></tr>
            </tbody>
          </table>
          <hr />
          {this.state.incorrect > 0 &&
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}></th>
                  <th>{i18n.t("question")}</th>
                  <th style={{ width: "20%" }}>{i18n.t("answer")}</th>
                  <th style={{ width: "20%" }}>{i18n.t("reply")}</th>
                  <th style={{ width: "25%" }}>{i18n.t("duration")}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.results.map((result, i) => result.correct ||
                  <tr key={i} className={result.correct ? "correct" : "incorrect"}>
                    <td><b /></td>
                    <td>{result.question.description}</td>
                    <td>{result.question.answer.text}</td>
                    <td>{result.reply === "" ? "--" : result.reply}</td>
                    <td>{result.duration.toFixed(1)}</td>
                  </tr>
                )}
              </tbody>
            </table>}
          <div className="modal-footer">
            <span className="btn" onClick={() => this.props.onClose()}>{i18n.t("close")}</span>
            {this.props.enableReview && this.state.incorrect >= 3 &&
              <span className="btn blue" onClick={() => this.props.onReview()}>{i18n.t("review")}</span>}
          </div>
        </div>
      </div>
    );
  }
}