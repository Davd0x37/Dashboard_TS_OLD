import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";

export default class Header extends Component {
  public props = {
    appName: "Dashboard"
  };

  protected state = {
    login: this.store.getter().User.Login,
    avatar: this.store.getter().User.Avatar
  };

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <header class="header">
        <div class="logo">
          <a href="#">{this.props.appName}</a>
        </div>
        <div class="user">
          <p class="user__name">{this.state.login}</p>
          <img src={this.state.avatar} alt="Avatar" class="user__avatar" />
        </div>
      </header>
    );
  }
}
