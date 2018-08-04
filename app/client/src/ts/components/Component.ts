export abstract class Component {
  protected element: Element | string;

  constructor(el: Element | string) {
    this.element = el
  }

  public abstract update(): void;
  protected abstract create(): void;
}