import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppRoutes } from "./app-routes.js";


export default class App extends Component {

  menu = () => {
    return <nav className="menu">
      <h1>數學練習小程式</h1>
      <ul>
        {AppRoutes.map((route, i) =>
          <li key={i}>
            <Link className="btn green" to={route.path}>{route.title}</Link>
          </li>)}
      </ul>
    </nav>;
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {AppRoutes.map((route, i) =>
              <Route key={i} path={`${route.path}`} component={() => route.component} />
            )}
            <Route exact>{this.menu()}</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}