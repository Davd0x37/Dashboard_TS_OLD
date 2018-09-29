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

import { Observer } from "../lib/Observer";
import Actions from "./Actions";
import Mutations from "./Mutations";
import { IState, State } from "./State";

export default class Store {
  public events: Observer;
  public state: IState;
  private actions: any = Actions;
  private mutations: any = Mutations;
  private status: string = "unused";

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
        console.group("PROXY_SET");
        console.log("TARGET", target);
        console.log("KEY", key);
        console.log("TARGET[KEY]", target[key].toString());
        console.log("VALUE", value);
        console.groupEnd();
        this.events.notify("stateChange", this.state);
        return Reflect.set(target, key, value, receiver);
      }
    });
  }

  // store.dispatch('actionType', 'SOMEDATA') --> actions.actionType(this(Store) `commit`, 'SOMEDATA') --> Store.commit('actionType', 'SOMEDATA')
  public dispatch(type: string, payload: any): boolean {
    if (this.isFn("actions", type)) {
      this.status = "actions";
      this.actions[type]({ commit: this.commit }, payload);

      return true;
    }
    return false;
  }

  // private commit(type: string, payload: any): boolean {
  //   console.log(this);
  //   if (this.isFn("mutations", type)) {
  //     const state = this.mutations[type](this.state, payload);
  //     this.state = { ...this.state, ...state };
  //     return true;
  //   }
  //   return false;
  // }

  // Use arrow function or .bind in dispatch
  private commit = (type: string, payload: any): boolean => {
    if (this.isFn("mutations", type)) {
      this.status = "mutations";
      const newState = this.mutations[type](this.state, payload);
      this.state = Object.assign(this.state, newState);
      // for (const i in this.state) {
      //   if (this.state.hasOwnProperty(i)) {
      //     // @ts-ignore
      //     // this.state[i] = newState[i];
      //   }
      // }
      return true;
    }
    return false;
  };

  private isFn(section: "actions" | "mutations", fnName: string): boolean {
    return typeof this[section][fnName] === "function";
  }
}
