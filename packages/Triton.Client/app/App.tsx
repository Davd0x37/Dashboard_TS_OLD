import "babel-polyfill";
import Actions from "#/components/Actions";
import Authenticate from "#/components/Authenticate";
import DigitalOcean from "#/components/DigitalOcean";
import Header from "#/components/Header";
import Paypal from "#/components/Paypal";
import Spotify from "#/components/Spotify";
import { DB } from "#/db";
import Events from "#/lib/Observer";
import Store from "#/store";
import Component from "./lib/Component";
import { VElement } from "./vdom/Interfaces";
import { createElement, mount } from "./vdom/VDOM";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

(async () => {
  const db = await DB.load();

  const user = await db.dashboard.findOne().exec();
  if (user !== null) {
    const data = {
      id: user.id,
      User: user.User,
      Spotify: user.Spotify,
      DigitalOcean: user.DigitalOcean,
      Paypal: user.Paypal
    };
    await Store.dispatch("UpdateUserData", data);
  }

  Events.subscribe("stateChange", async () => {
    console.log(Store.getter());
    const userExec = await db.dashboard.findOne().exec();
    if (userExec !== null) {
      userExec.update({
        $set: {
          ...Store.getter()
        }
      });
    } else {
      db.dashboard.insert(Store.getter());
    }
  });
})();

class App extends Component {
  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <main class="feed">
        <Header />
        <Spotify />
        <Paypal />
        <DigitalOcean />
        <Actions />
        <Authenticate />
      </main>
    );
  }
}

const root = document.querySelector<HTMLElement>("#app")!;
const mnt = mount(<App />, root);
