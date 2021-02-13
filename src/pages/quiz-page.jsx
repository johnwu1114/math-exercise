import "../styles/quiz.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import SchulteTable from "../components/schulte-table.jsx";
import QuizAttempt from "../components/quiz-attempt.jsx";
import QuizResult from "../components/quiz-result.jsx";
import QuizSetting from "../components/quiz-setting.jsx";

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.quizAttempt = React.createRef();
    this.handleUnload = this.handleUnload.bind(this);
    this.questionBank = this.props.questionBank();
  }

  componentDidMount() {
    document.title = `${this.questionBank.getTitle()} | ${i18n.t("app-name")}`;
    window.addEventListener("beforeunload", this.handleUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUnload);
  }

  handleUnload(e) {
    var message = "";

    (e || window.event).returnValue = message; // Gecko + IE
    return message;
  }

  onStart = (options) => {
    this.questionBank.setSettings(options);
    this.questionBank.initQuestions();
    this.setState({
      componentName: this.questionBank.getSetting("component"),
      enableReview: this.questionBank.getSetting("enableReview")
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
    this.questionBank.setQuestions(questions);

    this.quizAttempt.current.nextQuestion();
    this.setState({ isShowResult: false });
  }

  onClose = () => {
    this.props.history.push(`/${i18n.language}/`);
  }

  renderSwitch = (componentName) => {
    switch (componentName) {
      case "QuizAttempt":
        return <QuizAttempt ref={this.quizAttempt}
          questionBank={this.questionBank}
          onFinish={results => this.showResult(results)} />;
      case "SchulteTable":
        return <SchulteTable
          questionBank={this.questionBank}
          onFinish={results => this.showResult(results)} />;
      default:
        return <QuizSetting
          questionBank={this.questionBank}
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