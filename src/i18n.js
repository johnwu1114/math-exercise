import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import {
  reactI18nextModule
} from "react-i18next";
import en from "./locales/en.json";
import zhtw from "./locales/zh-tw.json";

// ref: https://react.i18next.com/legacy-v9/step-by-step-guide

const resources = {
  "en": {
    translation: en
  },
  "zh-TW": {
    translation: zhtw
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    // lng: "zhtw",
    fallbackLng: "zh-TW",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });


document.documentElement.lang = i18n.language;
export default i18n;