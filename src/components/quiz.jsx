import "../styles/quiz.css";
import React, { Component } from "react";
import SchulteTable from "./schulte-table.jsx";
import QuizAttempt from "./quiz-attempt.jsx";
import QuizResult from "./quiz-result.jsx";
import QuizSectionSelector from "./quiz-section-selector.jsx";

export default class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      answer: {},
      choices: [],
      results: []
    };
    this.quizAttempt = React.createRef();
  }

  onStart = (sections) => {
    let questionBank = this.props.questionBank;
    let questions = questionBank.generateQuestions(sections);
    questionBank.addQuestions(questions);
    this.setState({ componentName: questionBank.getComponentName() });
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
      .map(x => x.question);
    for (let i = 0; i < 3; i++)
      this.props.questionBank.addQuestions(questions);

    this.quizAttempt.current.nextQuestion();
    this.setState({ isShowResult: false });
  }

  onClose = () => {
    this.props.onClose();
  }

  renderSwitch = (componentName) => {
    switch (componentName) {
      case "QuizAttempt":
        return <QuizAttempt ref={this.quizAttempt}
          questionBank={this.props.questionBank}
          onFinish={results => this.showResult(results)} />;
      case "SchulteTable":
        return <SchulteTable
          questionBank={this.props.questionBank}
          onFinish={results => this.showResult(results)} />;
      default:
        return <QuizSectionSelector
          questionBank={this.props.questionBank}
          onStart={sections => this.onStart(sections)} />;
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          {this.state.isShowResult || <span className="close" onClick={() => this.props.onClose()}>x</span>}
        </div>
        {this.renderSwitch(this.state.componentName)}
        {this.state.isShowResult &&
          <QuizResult
            results={this.state.results}
            onReview={() => this.onReview()}
            onClose={() => this.onClose()} />}
      </div>
    );
  }
}