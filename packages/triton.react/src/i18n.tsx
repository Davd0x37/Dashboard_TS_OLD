import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

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
          "Spotify.username": "Username",
          "Spotify.email": "Email",
          "Spotify.type": "Account type",
          "DigitalOcean.email": "Email",
          "DigitalOcean.lastCreatedDroplet": "Last created droplet",
          "DigitalOcean.hoursAgo": "hours ago",
          "DigitalOcean.dropletLimit": "Droplet limit",
          "DigitalOcean.droplets": "Droplets",
          "Paypal.username": "User name",
          "Paypal.email": "Email",
          "Paypal.phoneNumber": "Phone Number",
          "Paypal.country": "Country",
          "Paypal.type": "Type",
          "Paypal.verified": "Verified",
          "Paypal.unverified": "Unverified",
          "Paypal.location": "Location"
        }
      },
      pl: {
        translations: {
          Welcome: "Witaj"
        },
        services: {
          "Spotify.username": "Użytkownik",
          "Spotify.email": "Email",
          "Spotify.type": "Typ konta",
          "DigitalOcean.email": "Email",
          "DigitalOcean.lastCreatedDroplet": "Ostatnio utworzony droplet",
          "DigitalOcean.hoursAgo": "godzin temu",
          "DigitalOcean.dropletLimit": "Limit dropletów",
          "DigitalOcean.droplets": "Dropletów",
          "Paypal.username": "Użytkownika",
          "Paypal.email": "Email",
          "Paypal.phoneNumber": "Numer telefonu",
          "Paypal.country": "Kraj",
          "Paypal.type": "Typ konta",
          "Paypal.verified": "Zweryfikowane",
          "Paypal.unverified": "Niezweryfikowane",
          "Paypal.location": "Miasto"
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
