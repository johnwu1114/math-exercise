import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  reactI18nextModule
} from "react-i18next";
import en from "./locales/en.json";
import zhtw from "./locales/zh-tw.json";
import zhcn from "./locales/zh-cn.json";
import ja from "./locales/ja.json";

// ref: https://react.i18next.com/legacy-v9/step-by-step-guide

export const Translations = {};
const whitelist = [];

let addTranslation = function(translation) {
  Translations[translation.path] = {
    name: translation.language,
    translation: translation
  };
  whitelist.push(translation.path);
}

addTranslation(en);
addTranslation(zhtw);
addTranslation(zhcn);
addTranslation(ja);

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    lowerCaseLng: true,
    whitelist: whitelist,
    resources: Translations,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });


document.documentElement.lang = i18n.language;
export default i18n;