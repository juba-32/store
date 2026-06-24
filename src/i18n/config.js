import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: savedLanguage,

  resources: {
    en: {
      translations: require("./locales/en/translations.json"),
    },
    ar: {
      translations: require("./locales/ar/translations.json"),
    },
  },

  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false,
  },
});

i18n.languages = ["en", "ar"];

document.documentElement.dir =
  savedLanguage === "ar" ? "rtl" : "ltr";

document.documentElement.lang = savedLanguage;

export default i18n;