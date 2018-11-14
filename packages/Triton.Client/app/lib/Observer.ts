type IOFn = (...args: any) => any;

const subscribers: Map<any, any> = new Map();

const subscribe = (event: string, fn: ReadonlyArray<IOFn>) =>
  subscribers[event] === undefined
    ? subscribers.set(event, [])
    : subscribers.set(event, [...subscribers.get(event), ...fn]);

const notify = (event: string, payload: {}) =>
  subscribers[event] === undefined
    ? false
    : subscribers.get(event).forEach((fn: IOFn) => fn(payload));

export default {
  subscribe,
  notify
};
