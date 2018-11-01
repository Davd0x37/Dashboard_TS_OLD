type IOFn = (...args: any[]) => any;

class Observer {
  public subscribers: any = {};

  public subscribe(event: string, ...fn: IOFn[]) {
    if (this.subscribers[event] === undefined) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(...fn);
  }

  public notify(event: string, payload: {}) {
    if (this.subscribers[event] === undefined) {
      return false;
    }

    this.subscribers[event].forEach((fn: IOFn) => fn(payload));
    return true;
  }
}

export default new Observer()