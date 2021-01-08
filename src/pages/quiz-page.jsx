import "../styles/quiz.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Config } from "../config.js";
import SchulteTable from "../components/schulte-table.jsx";
import QuizAttempt from "../components/quiz-attempt.jsx";
import QuizResult from "../components/quiz-result.jsx";
import QuizSetting from "../components/quiz-setting.jsx";

class QuizPage extends Component {
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

  componentDidMount(){
    document.title = `${this.props.questionBank.getTitle()} | ${Config.AppName}`;
  }

  onStart = (options) => {
    let questionBank = this.props.questionBank;
    questionBank.setSettings(options);
    questionBank.initQuestions();

    this.setState({
      componentName: questionBank.getSetting("component"),
      enableReview: questionBank.getSetting("enableReview")
    });
  }

  showResult = (results) => {
    this.state.results.splice(0, this.state.results.length);
    this.setState({
      isShowResult: true,
      results: results
    });
  }

  onReview = () => {
    let questions = [];
    let incorrectQuestions = this.state.results
      .filter(x => !x.correct)
      .map(x => x.question);
    for (let i = 0; i < 3; i++)
      questions = questions.concat(incorrectQuestions);
    this.props.questionBank.setQuestions(questions);

    this.quizAttempt.current.nextQuestion();
    this.setState({ isShowResult: false });
  }

  onClose = () => {
    this.props.history.push("/");
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
        return <QuizSetting
          questionBank={this.props.questionBank}
          onStart={option => this.onStart(option)} />;
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          {this.state.isShowResult || <span className="close" onClick={() => this.onClose()}>x</span>}
        </div>
        {this.renderSwitch(this.state.componentName)}
        {this.state.isShowResult &&
          <QuizResult
            enableReview={this.state.enableReview}
            results={this.state.results}
            onReview={() => this.onReview()}
            onClose={() => this.onClose()} />}
      </div>
    );
  }
}

export default withRouter(QuizPage);