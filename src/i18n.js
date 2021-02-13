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

export const Translations = {
  "en": { translation: en },
  "zh-tw": { translation: zhtw },
  "zh-cn": { translation: zhcn },
  "ja": { translation: ja },
};

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    lowerCaseLng: true,
    whitelist: ["en", "zh-tw", "zh-cn", "ja"],
    resources: Translations,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });


document.documentElement.lang = i18n.language;
export default i18n;