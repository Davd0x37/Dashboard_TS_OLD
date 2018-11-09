
// @ts-ignore
import en from "./en-EN.json";
// @ts-ignore
import pl from "./pl-PL.json";

const langs = {
  pl,
  en
};

const lang = navigator.language.split("-")[0];
export default langs[lang];
