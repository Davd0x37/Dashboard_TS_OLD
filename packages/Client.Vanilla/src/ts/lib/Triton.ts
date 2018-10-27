import i18n from "../lib/I18n";
import Store from "../store/Store";
import { $ } from "./DOM";

export default abstract class Triton {
  protected store: typeof Store = Store;
  protected lang: typeof i18n = i18n;
  protected className: string = this.constructor.name;

  constructor() {
    this.stateChange();
  }

  public abstract render(...args: any[]): string;
  public mounted(..._: any[]): void {
    //
  }
  
  protected stateChange() {
    this.store.events.subscribe(`stateChange`, () => {
      this.update();
    });
  }

  private update(..._: any[]): void {
    const el = $(`#${this.className}`)
    if(el !== null) {
      el.innerHTML = this.render();
      this.mounted();
    }
  }

}
