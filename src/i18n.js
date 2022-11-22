import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
        }
      },
      hi: {
        translation: {
          "Motion": "चाल",
          "Tilling": "खेत जोतना",
          "Harvest": "फ़सल कटाई",
          "Control": "नियंत्रण",
          "Python": "पाइथन",
          "JavaScript": "जावास्क्रिप्ट",
          "Blocks": "ब्लॉक",
        }
      }
    }
  });

export default i18n;