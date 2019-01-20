import Component from "./Component";

import Actions from "#/components/Actions";
import Authenticate from "#/components/Authenticate";
import DigitalOcean from "#/components/DigitalOcean";
import Header from "#/components/Header";
import { createElement, mount } from "#/vdom/VDOM";
import Paypal from "#/components/Paypal";
import Spotify from "#/components/Spotify";
import { VElement } from "#/vdom/Interfaces";
import Observer from "./Observer";

const routes = {
  "/": (
    <main class="feed">
      <Header />
      <Spotify />
      <Paypal />
      <DigitalOcean />
      <Actions />
    </main>
  ),
  "/auth": (
    <div>
      <Authenticate />
      <Actions />
    </div>
  ),
  NotFound: <div>404 OMG</div>
};

export default class Router extends Component {
  protected state = {
    view: "/auth"
  };

  constructor(props?: {}) {
    super(props);
    Observer.subscribe("RouterChange", (view: string) => {
      this.setState({ view });
      console.log(this.render())
    });
  }

  public render(): VElement {
    return this.state.view === "/" ? (
      <main class="feed">
        <Header />
        <Spotify />
        <Paypal />
        <DigitalOcean />
        <Actions />
      </main>
    ) : (
      <div>
        <Authenticate />
        <Actions />
      </div>
    );
  }

  protected views = (): any =>
    routes.hasOwnProperty(this.state.view)
      ? routes[this.state.view]
      : routes["NotFound"];
}
