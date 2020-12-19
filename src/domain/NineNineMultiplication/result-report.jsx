import "./style.css";
import React, { Component } from "react";

export default class ResultReport extends Component {
  constructor(props) {
    super(props);
    this.state = { results: this.props.results };
  }

  render() {
    return (
      <div class="modal">
        <div class="modal-content">
          <table>
            <tr>
              <th></th><th>題目</th><th>作答</th><th>耗時</th>
            </tr>
            {this.state.results.map((result) =>
              <tr>
                <td>{result.pass ? <b className="pass">O</b> : <b className="fail">X</b>}</td><td>{result.question}</td><td>{result.answer || "--"}</td><td>{result.duration.toFixed(1)}</td>
              </tr>
            )}
          </table>
          <span className="close" onClick={() => this.props.onClose()}>關閉</span>
        </div>
      </div>
    );
  }
}