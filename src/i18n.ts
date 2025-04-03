import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';

// ¡Invocando al mago de los idiomas po wn! 🧙‍♂️
i18n
  // ¡Detective bakán que cacha al tiro tu idioma aunque no le digai ná! 🕵️‍♂️
  .use(LanguageDetector)
  // Le ponimos poderes a React pa' que hable varios idiomas, ¡quedó filete! 💉
  .use(initReactI18next)
  // Iniciando la máquina pa' traducir... ¡Dale con la pulenta traducción! 🚀
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      },
      fr: {
        translation: frTranslation
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // React ya escapa valores (es más choreado que la cresta) 🙈
    },
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  });

export default i18n; 