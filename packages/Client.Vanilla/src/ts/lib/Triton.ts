import Store from "../store/Store";
import { $ } from "./DOM";

export default abstract class Triton {
  protected store: typeof Store = Store;
  protected className: string = this.constructor.name;

  constructor() {
    this.stateChange();
  }

  public abstract render(...args: any[]): string;
  public mounted(...args: any[]): void {
    //
  }
  
  protected stateChange() {
    this.store.events.subscribe(`stateChange`, () => {
      this.update();
    });
  }

  private update(...args: any[]): void {
    const el = $(`#${this.className}`)
    if(el !== null) {
      el.innerHTML = this.render();
      this.mounted();
    }
  }

}
