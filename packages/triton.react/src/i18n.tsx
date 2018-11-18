import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(reactI18nextModule)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translations: {
          Welcome: "XDD"
        },
        services: {
          Spotify: {
            username: "Username",
            email: "Email",
            type: "Account type"
          }
        }
      },
      pl: {
        translations: {
          Welcome: "Witaj"
        }
      }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ","
    },

    react: {
      wait: true
    }
  });

export default i18n;
