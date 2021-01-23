import React, { Component } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { AppRoutes } from "../app-routes.js";

export default class MenuPage extends Component {

  constructor(props) {
    super(props);
    this.title = i18n.t("app-name");
  }

  componentDidMount() {
    document.title = this.title;
  }

  render() {
    return (
      <nav className="menu">
        <h1>{this.title}</h1>
        <ul>
          {AppRoutes.map((route, i) =>
            <li key={i}>
              <Link className="btn green" to={route.path}>{route.title}</Link>
            </li>)}
        </ul>
      </nav>
    );
  }
}