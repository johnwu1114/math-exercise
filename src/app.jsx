import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import i18n from "i18next";
import { withNamespaces } from "react-i18next";
import { AppRoutes } from "./app-routes.js";
import { Translations } from "./i18n.js";
import MenuPage from "./pages/menu-page.jsx";

class App extends Component {

  constructor(props) {
    super(props);

    let langCode = window.location.pathname.split("/")[1];
    if (!Translations[langCode]) {
      langCode = i18n.language;
    }
    if (langCode !== i18n.language) {
      i18n.changeLanguage(langCode);
    }
  }

  componentDidMount() {
    this.setMeta("description", i18n.t("app-description"));
    this.setMeta("keywords", i18n.t("app-keywords"));
  }

  setMeta = (key, content) => {
    const el = document.querySelector(`head meta[name='${key}']`);
    el.setAttribute("content", content)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            {AppRoutes.map((route, i) =>
              <Route key={i} path={`/:lang/${route.path}`} component={() => route.component} />
            )}
            <Route exact component={MenuPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withNamespaces()(App);