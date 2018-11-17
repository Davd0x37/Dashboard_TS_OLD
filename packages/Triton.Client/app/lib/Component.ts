import { update } from "./vdom/VDOM";
import { VElement, VNode } from "./vdom/Interfaces";

export default class Component {
  public _currentElement!: VElement;
  public _parentNode!: HTMLElement;
  // private _pendingState: any = null;

  public props: {} = {};
  protected state: {} = {};

  constructor(props?: {}) {
    this.props = props || this.props;
  }

  protected setState(state: {}) {
    this.state = { ...this.state, ...state };
    this.updateComponent();
  }

  private updateComponent() {
    const prevElement = this._currentElement;
    const nextElement = this.render();
    this._currentElement = nextElement;

    update(prevElement, nextElement);
  }

  public render(): any {
    //
  }
}
