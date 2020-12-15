import "./style.css";
import React, { Component } from "react";
import Countdown from "../../components/countdown.jsx";

export default class NineNineMultiplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      selections: []
    };
    this.countdown = React.createRef();

    this.questions = [];

    for (let i = 2; i <= 9; i++)
      for (let j = 2; j <= 9; j++) {
        this.questions.push({
          question: `${i} x ${j}`,
          answer: i * j
        });
      }
  }

  componentDidMount() {
    this.nextQuestion();
  }

  nextQuestion = () => {
    if (this.questions.length === 0){
      this.props.finish();
      return;
    }

    let index = Math.floor(Math.random() * this.questions.length);
    let item = this.questions.splice(index, 1)[0];
    this.setState(item);
    this.createSelections(item.answer);
    this.countdown.current.reset();
  }

  createSelections = (answer) => {
    this.state.selections.splice(0, this.state.selections.length);

    let seeds = [];
    for (let i = Math.max(2, answer - 20); i < answer + 20; i++)
      seeds.push(i);

    let selections = [];
    for (let i = 0; i < 5; i++) {
      let index = Math.floor(Math.random() * seeds.length);
      let selection = seeds.splice(index, 1)[0];
      selections.push(selection);
    }

    selections.splice(Math.floor(Math.random() * 5), 0, answer);

    this.setState({ selections: selections });
  }

  answer = (num) => {
    if (num === this.state.answer) this.pass();
    else this.fail();
  }

  pass = () => {
    this.nextQuestion();
  }

  fail = () => {
    this.questions.push({
      question: this.state.question,
      answer: this.state.answer
    });
    this.nextQuestion();
  }

  render() {
    return (
      <div>
        <div className="question">
          {this.state.question}
        </div>
        <ul className="selections">
          {this.state.selections.map((selection) =>
            <li onClick={() => this.answer(selection)} >{selection}</li>
          )}
        </ul>
        <Countdown ref={this.countdown} timeout={() => this.nextQuestion()} />
      </div>
    );
  }
}