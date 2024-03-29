import Observer from "#/lib/Observer";
import { FnType } from "#SH/Interfaces";
import Actions from "./Actions";
import Mutations from "./Mutations";
import { State, IState } from "./State";

/**
 * UTILS
 */
const isFn = (section: FnType, fnName: string): boolean =>
  typeof section[fnName] === "function";

/**
 * Store Data
 */
const events = Observer;

const state = new Proxy(State || {}, {
  get: (target, p, receiver) => {
    return Reflect.get(target, p, receiver);
  },
  set: (target: any, key: any, value: any, receiver: any) => {
    events.notify("stateChange", value);
    return Reflect.set(target, key, value, receiver);
  }
});

/**
 * Store functions
 */
const dispatch = (type: string, payload: any): boolean =>
  isFn(Actions, type) ? Actions[type]({ commit }, payload) : false;

const commit = (type: string, payload: any): IState =>
  isFn(Mutations, type)
    ? (state.store = {
        ...state.store,
        ...Mutations[type](state.store, payload)
      })
    : state.store;

const getter = () => state.store;

export default {
  dispatch,
  getter,
  state: state.store
};
