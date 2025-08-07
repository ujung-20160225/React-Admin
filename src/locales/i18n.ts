import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 加载语言文件
import en_US from "./lang/en_US";
import zh_CN from "./lang/zh_CN";
let defaultLng = localStorage.getItem("i18nextLng") as string;
if (defaultLng === "en_US") {
  localStorage.setItem("i18nextLng", "en");
  defaultLng = "en";
} else if (defaultLng === "zh_CN") {
  localStorage.setItem("i18nextLng", "zh");
  defaultLng = "zh";
}
i18n
  .use(LanguageDetector) // 自动检测浏览器语言 learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(initReactI18next) // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: defaultLng,
    fallbackLng: "zh", // 默认语言
    resources: {
      en: { translation: en_US },
      zh: { translation: zh_CN },
    },

    interpolation: { escapeValue: false }, // 支持 React 组件插值
  });

export default i18n;
export const { t } = i18n;
