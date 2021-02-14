import React, { Component } from "react";
import { Helmet } from "react-helmet";
import i18n from "i18next";
import { Translations } from "../i18n.js";

export default class SEO extends Component {

  constructor(props) {
    super(props);
    this.lang = i18n.language;
    this.title = props.title || i18n.t("app-name");
    this.description = props.description || i18n.t("app-description");
    this.keywords = props.keywords || i18n.t("app-keywords");
    document.title = this.title;

    this.meta = [
      {
        name: "description",
        content: this.description,
      },
      {
        name: "keywords",
        content: this.keywords,
      },
      {
        itemprop: "name",
        content: this.title,
      },
      {
        itemprop: "description",
        content: this.description,
      },
      {
        property: "og:title",
        content: this.title,
      },
      {
        property: "og:description",
        content: this.description,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: window.location.href,
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:title",
        content: this.title,
      },
      {
        name: "twitter:description",
        content: this.description,
      },
    ];

    this.link = [];
    for (let langCode in Translations) {
      let href = window.location.href.replace(this.lang, langCode);
      this.link.push({
        rel: "alternate",
        hreflang: langCode,
        href: href
      });
    }
  }

  render() {
    return (
      <Helmet
        htmlAttributes={{
          lang: this.lang
        }}
        title={this.props.title}
        meta={this.meta}
        link={this.link}
      />
    );
  }
}