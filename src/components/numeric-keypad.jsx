import "../styles/schulte-table.css";
import React, { Component } from "react";

export default class NumericKeypad extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: {}
    };

    this.numbers = [];
    for (let i = 1; i <= 9; i++) {
      this.numbers.push(i);
    }
    this.clear();
  }

  onClick = (num) => {
    this.input += `${num}`;

    if (this.props.onChanged)
      this.props.onChanged(this.input);
  }

  onBack = () => {
    if (this.input.length <= 1)
      this.clear();
    else
      this.input = this.input.substring(0, this.input.length - 1);

    if (this.props.onChanged)
      this.props.onChanged(this.input);
  }

  onConfirm = () => {
    this.props.onConfirm(this.input);
    this.clear();
  }

  clear = () => {
    this.input = "";
  }

  render() {
    const { clicked } = this.state;
    return (
      <div className="numeric-keypad">
        <div className="numbers">
          {this.numbers.map(num =>
            <div key={num}
              className={`cell ${(clicked.num === num ? clicked.sytle : "")}`}
              onClick={() => this.onClick(num)}><span>{num}</span></div>
          )}
          <div className="cell" onClick={() => this.onBack()}><span>Back</span></div>
          <div className={`cell ${(clicked.num === 0 ? clicked.sytle : "")}`}
            onClick={() => this.onClick(0)}><span>0</span></div>
          <div className="cell" onClick={() => this.onConfirm()}><span>Confirm</span></div>
        </div>
      </div>
    )
  }
}