type IOFn = (...args: any) => any;

let subscribers = {};

const subscribe = (event: string, fn: IOFn) => {
  if (subscribers[event] === undefined) {
    subscribers[event] = [];
  }
  subscribers[event].push(fn);
};

const notify = (event: string, payload: {}) => {
  if (subscribers[event] === undefined) {
    return false;
  }
  subscribers[event].map((fn: IOFn) => fn(payload));
  return true;
};

export default {
  subscribe,
  notify
};
