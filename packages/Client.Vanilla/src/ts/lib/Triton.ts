import Store from "../store/Store";
import { $ } from "../utils/DOM";

export default abstract class Triton {
  protected store: typeof Store = Store;
  protected className: string = this.constructor.name;

  protected constructor() {
    this.store.events.subscribe(`stateChange`, () => {
      this.update();
    });
  }

  public abstract render(...args: any[]): string;
  public mounted(...args: any[]): void {
    //
  }
  

  private update(...args: any[]): void {
    // $(`#${this.className}`)!.inner = this.render();
    this.mounted();
  }
}
