import Store from "../store/Store";

export default abstract class Triton {
  protected store: any = new Store();
  protected className: string = this.constructor.name;

  protected constructor() {
    this.store.events.subscribe(`stateChange`, () => this.update());
  }

  protected abstract render(): string;

  private update(): void {
    document.querySelector(`#${this.className}`)!.innerHTML = this.render();
  }
}
