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
import State from "./State";

class Store {
  public events: Observer;
  public state: any;
  private actions: any = Actions;
  private mutations: any = Mutations;
  private status: string = "unused";

  constructor() {
    this.events = new Observer();
    this.state = new Proxy((State || {}), {
      get: (target, p, receiver) => {
        return Reflect.get(target, p, receiver);
      },
      set: (target: any, key: any, value: any) => {
        if (this.status !== "mutations") {
          console.warn(`Use mutation to set ${key}`);
        }
        console.log("notify-state");
        this.events.notify("stateChange", this.state);
        return Reflect.set(target, key, value);
      }
    });
  }

  // store.dispatch('actionType', 'SOMEDATA') --> actions.actionType(this(Store) `commit`, 'SOMEDATA') --> Store.commit('actionType', 'SOMEDATA')
  public dispatch(type: string, payload: any): boolean {
    if (this.isFn("actions", type)) {
      (this.status = "actions")
      this.actions[type](
        { commit: this.commit.bind(this), state: this.state },
        payload
      );

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
      // this.state = newState
      // console.log(newState, this.state)
      // this.state = Object.assign(this.state, 's')
      // this.state = {...this.state, service: {DigitalOcean: {email: "TESTERERERE"}}}
      return true;
    }
    return false;
  };

  private isFn(section: "actions" | "mutations", fnName: string): boolean {
    return typeof this[section][fnName] === "function";
  }

  // private proxy = (obj: any) => {
  //   obj = new Proxy(obj, {
  //     set: (state: any, key: string, value: any) => {
  //       console.log('notify-state')
  //       // state[key] = value;
  //       Reflect.set(state, key, value);
  //       this.events.notify("stateChange", this.state);
  //       if (this.status !== "mutation") {
  //         console.warn(`Use mutation to set ${key}`);
  //       }
  //       return true;
  //     }
  //   });
}

export default new Store();
