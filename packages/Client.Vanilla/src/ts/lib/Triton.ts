import lang from "../i18n";
import Store from "../store/Store";
import { $ } from "../utils/DOM";
import Observer from "./Observer";

export default abstract class Triton {
  protected store: typeof Store = Store;
  protected lang: any = lang;
  protected className: string = this.constructor.name;
  protected events: typeof Observer = Observer;

  constructor() {
    this.stateChange();
  }

  public abstract render(): string;
  public abstract mounted(): void;

  protected stateChange() {
    this.store.events.subscribe(`stateChange`, async () => {
      await this.update();
    });
  }

  private async update(): Promise<void> {
    const el = $(`#${this.className}`);
    if (el !== null) {
      const view = await this.render();
      el.innerHTML = view;
      await this.mounted();
    }
  }
}
