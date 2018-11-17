import { VElement } from "#/vdom/Interfaces";
import { update } from "#/vdom/VDOM";

export default class Component {
  public pCurrentElement!: VElement;
  public pParentNode!: HTMLElement;
  // private _pendingState: any = null;

  public props: {} = {};
  protected state: {} = {};

  constructor(props?: {}) {
    this.props = props || this.props;
  }

  public render(): any {
    //
  }

  protected setState(state: {}): void {
    this.state = { ...this.state, ...state };
    this.updateComponent();
  }

  private updateComponent(): void {
    const prevElement = this.pCurrentElement;
    const nextElement = this.render();
    this.pCurrentElement = nextElement;

    update(prevElement, nextElement);
  }
}
