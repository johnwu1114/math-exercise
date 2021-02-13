import { Component } from "react";
import i18n from "i18next";
import { Translations } from "../i18n.js";

export default class PageBase extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    for (let langCode in Translations) this.setLink(langCode);
  }

  setLink = (langCode) => {
    let link = document.querySelector(`head link[hreflang='${langCode}']`);
    let href = window.location.href.replace(i18n.language, langCode);
    if (link) link.setAttribute("href", href);
    else {
      link = document.createElement("link");
      link.rel = "alternate"
      link.hreflang = langCode;
      link.href = href
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }
}