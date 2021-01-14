import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import './i18n';
import App from "./app.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

