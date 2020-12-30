import "../styles/schulte-table.css";
import React, { Component } from "react";

export default class SchulteTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      clicked: {}
    };

    for (let i = 1; i <= 25; i++) {
      this.state.numbers.push(i);
    }
  }

  onClick = (num) => {
    clearTimeout(this.timeoutId);
    this.setState({
      clicked: {
        num: num,
        sytle: num % 2 === 1 ? "correct" : "incorrect"
      }
    });
    this.timeoutId = setTimeout(() => {
      this.setState({ clicked: {} });
    }, 1000);
  }

  render() {
    const { clicked } = this.state;
    return (
      <div>
        <div className="schulte-table size-5x5">
          {this.state.numbers.map((num) =>
            <div key={num}
              className={"cell " + (clicked.num === num && clicked.sytle)}
              onClick={() => this.onClick(num)}><span>{num}</span></div>
          )}
        </div>
      </div >
    );
  }
}