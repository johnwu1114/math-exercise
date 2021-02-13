import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import PageBase from "./page-base.js";
import { AppRoutes } from "../app-routes.js";
import { Translations } from "../i18n.js";

export default class MenuPage extends PageBase {

  constructor(props) {
    super(props);
    this.title = i18n.t("app-name");
    this.translations = [];
    for (let langCode in Translations) {
      this.translations.push({
        path: langCode,
        name: Translations[langCode].name
      });
    }
  }

  componentDidMount() {
    super.componentDidMount();
    document.title = this.title;
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="dropdown">
            <button className="dropbtn">{i18n.t("language")}</button>
            <div className="dropdown-content">
              {this.translations.map((translation, i) =>
                <a key={i} hrefLang={translation.path} href={`${window.location.origin}/${translation.path}/`}>{translation.name}</a>
              )}
            </div>
          </div>
        </div>
        <nav className="menu">
          <h1>{this.title}</h1>
          <ul>
            {AppRoutes.map((route, i) =>
              <li key={i}>
                <Link className="btn green" to={`/${i18n.language}/${route.path}`}>{i18n.t(route.path)}</Link>
              </li>)}
          </ul>
        </nav>
      </div>
    );
  }
}