import "reflect-metadata";
import langs from "../i18n";

class I18n {
  private language: string;
  constructor() {
    const lang = navigator.language;
    this.language = lang.split("-")[0];
  }

  public get data(): any {
    return langs[this.language];
  }

  public load(): void {
    const lang = navigator.language;
    this.language = lang.split("-")[0];
  }
}

export default new I18n();
