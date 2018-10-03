/**
 * Store {
 *   actions: methods/functions which invokes mutations
 *   mutations: methods/functions which modify store
 *   state: Storage where all data will be store
 *
 *   public dispatch(type `action name`, payload `data passed to action`): boolean -> invoke action
 *   private commit(type `mutation name`, payload `same as dispatch`): boolean -> will be invoked by dispatch
 * }
 */

import Storage from "../controller/Storage";
import { Observer } from "../lib/Observer";
import Actions from "./Actions";
import Mutations from "./Mutations";
import { IStateStore, State } from "./State";

class Store {
  public events: Observer;
  private state: IStateStore;
  private actions: any = Actions;
  private mutations: any = Mutations;
  private status: string = "unused";

  public get getter() {
    return this.state.store;
  }

  constructor() {
    this.events = new Observer();
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
    this.dispatch('restoreStorage', '');
  }

  /**
   * Execute selected action
   * @param type
   * @param payload
   */
  public dispatch(type: string, payload: any): boolean {
    if (this.isFn("actions", type)) {
      this.status = "actions";
      this.actions[type]({ commit: this.commit }, payload);
      return true;
    }
    return false;
  }

  // Use arrow function or .bind in dispatch
  private commit = (type: string, payload: any): boolean => {
    if (this.isFn("mutations", type)) {
      this.status = "mutations";
      const newState = this.mutations[type](this.state.store, payload);
      this.state.store = { ...this.state.store, ...newState };
      Storage.storageData = this.state.store;
      return true;
    }
    return false;
  };

  /**
   * Check if action or mutation is function
   * @param section
   * @param fnName
   */
  private isFn(section: "actions" | "mutations", fnName: string): boolean {
    return typeof this[section][fnName] === "function";
  }
}

export default new Store();
