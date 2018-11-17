// declare namespace JSX {
//   interface IntrinsicElements {
//     readonly [key: string]: any;
//   }
// }

// import { mount } from "./lib/vdom/Mount";

// import { DB } from "#/db";
// import App from "#/lib/App";
// import Store from "#/store";

// (async () => {
//   const db = await DB.load();
//   App.init(db);
//   App.loadStore();
//   App.run();

//   Store.events.subscribe("stateChange", async () => {
//     const user = await App.db.dashboard.findOne().exec();
//     if (user !== null) {
//       user.update({
//         $set: {
//           ...Store.getter
//         }
//       });
//     } else {
//       App.db.dashboard.insert(Store.getter);
//     }
//   });
// })();

import Component from "./lib/Component";
import { VElement } from "./vdom/Interfaces";
import { createElement, mount } from "./vdom/VDOM";
const root = document.querySelector<HTMLElement>("#app")!;

class App extends Component {
  protected state = {
    counter: 1
  };

  constructor(props?: {}) {
    super(props);
  }

  public ale = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  public render(): VElement {
    return (
      <div>
        <p>
          <a
            styles={{
              backgroundColor: "red",
              fontSize: this.state.counter / 2 + "rem"
            }}
            onClick={this.ale}
          >
            counter: <p>{this.state.counter}</p>
          </a>
        </p>
      </div>
    );
  }
}

const mnt = mount(createElement(App, {}), root);
