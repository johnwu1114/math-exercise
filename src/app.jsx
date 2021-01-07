import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Quiz from "./components/quiz.jsx";
import SchulteTableQuestionBank from "./libs/question-bank/schulte-table.js";
import AdditionQuestionBank from "./libs/question-bank/addition.js";
import SubtractionQuestionBank from "./libs/question-bank/subtraction.js";
import MultiplicationQuestionBank from "./libs/question-bank/multiplication.js";
import ClockQuestionBank from "./libs/question-bank/clock.js";

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      questionBanks: [
        new SchulteTableQuestionBank(),
        new AdditionQuestionBank(),
        new SubtractionQuestionBank(),
        new MultiplicationQuestionBank(),
        new MultiplicationQuestionBank(2),
        new ClockQuestionBank()
      ]
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <nav className="menu">
                <h1>數學練習小程式</h1>
                <ul>
                  {this.state.questionBanks.map((questionBank, i) =>
                    <li key={i}>
                      <Link className="btn green" to={`/${questionBank.getRoute()}`}>{questionBank.getTitle()}</Link>
                    </li>)}
                </ul>
              </nav>
            </Route>
            {this.state.questionBanks.map((questionBank, i) =>
              <Route key={i} path={`/${questionBank.getRoute()}`} >
                <Quiz questionBank={questionBank} />
              </Route>)}
          </Switch>
        </div>
      </Router>
    );
  }
}