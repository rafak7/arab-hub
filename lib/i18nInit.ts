import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Verifica se i18n já foi inicializado pelo next-i18next
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        pt: {
          common: require('../public/locales/pt/common.json')
        },
        en: {
          common: require('../public/locales/en/common.json')
        },
        ar: {
          common: require('../public/locales/ar/common.json')
        }
      },
      lng: 'pt', // Idioma padrão
      fallbackLng: 'pt',
      debug: process.env.NODE_ENV === 'development',
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
}

export default i18n; 