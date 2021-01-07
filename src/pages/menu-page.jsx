import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Config } from "../config.js";
import { AppRoutes } from "../app-routes.js";

export default class MenuPage extends Component {
  componentDidMount() {
    document.title = Config.AppName;
  }

  render() {
    return (
      <nav className="menu">
        <h1>{Config.AppName}</h1>
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