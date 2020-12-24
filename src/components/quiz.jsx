import "../styles/exam.css";
import React, { Component } from "react";
import QuizAttempt from "./quiz-attempt.jsx";
import QuizResult from "./quiz-result.jsx";
import QuizSectionSelector from "./quiz-section-selector.jsx";

export default class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      choices: [],
      results: []
    };
    this.quizAttempt = React.createRef();
  }

  onStart = (sections) => {
    let questions = this.props.strategy.generateQuestions(sections);
    this.props.strategy.addQuestions(questions);
    this.setState({ isStarted: true });
  }

  showResult = (results) => {
    this.state.results.splice(0, this.state.results.length);
    this.setState({
      isShowResult: true,
      results: results
    });
  }

  onReview = () => {
    let questions = this.state.results
      .filter(x => !x.correct)
      .map(x => {
        return {
          question: x.question,
          answer: x.answer
        }
      });
    for (let i = 0; i < 3; i++)
      this.props.strategy.addQuestions(questions);

    this.quizAttempt.current.nextQuestion();
    this.setState({ isShowResult: false });
  }

  onClose = () => {
    this.props.onClose();
  }

  render() {
    return (
      <div>
        <div className="header">
          {this.state.isShowResult || <span className="close" onClick={() => this.props.onClose()}>x</span>}
        </div>
        {this.state.isStarted
          ? <QuizAttempt ref={this.quizAttempt}
            strategy={this.props.strategy}
            onFinish={results => this.showResult(results)}
            onClose={() => this.onClose()} />
          : <QuizSectionSelector
            strategy={this.props.strategy}
            onStart={sections => this.onStart(sections)} />}
        {this.state.isShowResult &&
          <QuizResult
            results={this.state.results}
            onReview={() => this.onReview()}
            onClose={() => this.onClose()} />}
      </div>
    );
  }
}