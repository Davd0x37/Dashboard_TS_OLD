type IOFn = (...args: any[]) => any;

export class Observer {
  public subscribers: any = {};

  public subscribe(event: string, ...fn: IOFn[]) {
    if (!this.subscribers.hasOwnProperty(event)) {
      this.subscribers[event] = [];
    }
    return this.subscribers[event].push(...fn);
  }

  public notify(event: string, payload: {}) {
    if (!this.subscribers.hasOwnProperty(event)) {
      return [];
    }

    return this.subscribers[event].map((fn: IOFn) => fn(payload));
  }
}