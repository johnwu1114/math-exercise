import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import i18n from "i18next";
import { AppRoutes } from "./app-routes.js";
import MenuPage from "./pages/menu-page.jsx";
import { withNamespaces } from "react-i18next";

class App extends Component {

  componentDidMount() {
    this.setMeta("description", i18n.t("app-description"));
    this.setMeta("keywords", i18n.t("app-keywords"));
  }

  setMeta = (key, content) => {
    const el = document.querySelector(`meta[name='${key}']`);
    el.setAttribute("content", content)
  }

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