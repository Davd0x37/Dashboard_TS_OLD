import "reflect-metadata";
import langs from "../i18n";

const lang = navigator.language.split("-")[0];
export default langs[lang];
