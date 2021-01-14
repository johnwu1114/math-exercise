import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AppRoutes } from "./app-routes.js";
import MenuPage from "./pages/menu-page.jsx";
import { withNamespaces } from "react-i18next";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {AppRoutes.map((route, i) =>
              <Route key={i} path={route.path} component={() => route.component} />
            )}
            <Route exact component={MenuPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withNamespaces()(App);