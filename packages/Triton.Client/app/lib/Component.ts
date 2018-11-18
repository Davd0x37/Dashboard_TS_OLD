import Store from "#/store";
import { VElement } from "#/vdom/Interfaces";
import { update } from "#/vdom/VDOM";
import Observer from "./Observer";

export default class Component {
  public pCurrentElement!: VElement;
  public pParentNode!: HTMLElement;

  public props: any = {};
  public watchers: any = {};
  protected state: {} = {};
  protected store: typeof Store = Store;

  constructor(props?: {}) {
    this.props = props || this.props;
    // Observer.subscribe("stateChange", data => {debugger; this.setState({ ...data })});
  }

  public render(): any {
    //
  }

  public mounted(): void {
    //
  }

  protected setState(state: {}): void {
    this.state = { ...this.state, ...state };
    // this.store.dispatch("UpdateUserData", this.state);
    this.updateComponent();
  }

  private updateComponent(): void {
    const prevElement = this.pCurrentElement;
    const nextElement = this.render();
    this.pCurrentElement = nextElement;

    update(prevElement, nextElement, this.pParentNode);
  }
}
