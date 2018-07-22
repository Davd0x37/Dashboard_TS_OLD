export class EventHandler {
  private listeners: any[string] = [{}];

  public addListener(
    type: string,
    fn: (...args: any[]) => any,
    ...args: any[]
  ): void {
    if (typeof this.listeners[type] !== "undefined") {
      this.listeners[type].push({
        fn,
        args
      });
    } else {
      this.listeners[type] = [
        {
          fn,
          args
        }
      ];
    }
  }

  public removeListener(type: string): boolean {
    if (typeof this.listeners[type] !== "undefined") {
      this.listeners[type] = [];
      return true;
    } else {
      return false;
    }
  }

  public dispatch(type: string, ...args: any[]): void {
    if (typeof this.listeners[type] !== "undefined") {
      for (const listener of this.listeners[type]) {
        if (listener.args.length === 0) {
          listener.fn(args);
        } else {
          listener.fn(listener.args);
        }
      }
    }
  }
}
