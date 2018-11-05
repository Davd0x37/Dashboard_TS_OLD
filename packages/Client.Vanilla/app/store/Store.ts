import Observer from "#SH/Observer";
import Actions from "./Actions";
import Mutations from "./Mutations";
import { IStateStore, State } from "./State";

class Store {
  public events: typeof Observer = Observer;
  private state: IStateStore;
  private actions: any = Actions;
  private mutations: any = Mutations;
  private status: string = "unused";

  public get getter() {
    return this.state.store;
  }

  constructor() {
    this.state = new Proxy(State || {}, {
      get: (target, p, receiver) => {
        return Reflect.get(target, p, receiver);
      },
      set: (target: any, key: any, value: any, receiver: any) => {
        if (this.status !== "mutations") {
          console.warn(`Use mutation to set ${key}`);
        }
        this.events.notify(`stateChange`, this.state.store);
        return Reflect.set(target, key, value, receiver);
      }
    });
    this.dispatch("restoreStorage", "");
  }

  /**
   * Execute selected action
   *
   * @param {string} type
   * @param {*} payload
   * @returns {Promise<boolean>}
   * @memberof Store
   */
  public async dispatch(type: string, payload: any): Promise<boolean> {
    if (this.isFn("actions", type)) {
      this.status = "actions";
      await this.actions[type]({ commit: this.commit }, payload);
      return true;
    }
    return false;
  }

  // Use arrow function or .bind in dispatch
  private commit = async (type: string, payload: any): Promise<boolean> => {
    if (this.isFn("mutations", type)) {
      this.status = "mutations";
      const newState = await this.mutations[type](this.state.store, payload);
      this.state.store = { ...this.state.store, ...newState };
      return true;
    }
    return false;
  };

  /**
   * Check if action or mutation is function
   *
   * @private
   * @param {("actions" | "mutations")} section
   * @param {string} fnName
   * @returns {boolean}
   * @memberof Store
   */
  private isFn(section: "actions" | "mutations", fnName: string): boolean {
    return typeof this[section][fnName] === "function";
  }
}

export default new Store();
