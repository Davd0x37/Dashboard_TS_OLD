import { isArray, isObject } from "lodash";
import { IHandlers, Observer } from "./Observer";

type FNSubscriber = (observer: Observer) => () => void;

class Observable {
  protected readonly subscriber: FNSubscriber;

  constructor(subscriber: FNSubscriber) {
    this.subscriber = subscriber;
  }

  /**
   * Execute subscriptions with passed handlers
   *
   * @param {IHandlers} obs
   * @returns unsubscribe()
   * @memberof Observable
   */
  public subscribe(obs: IHandlers) {
    const observer = new Observer(obs);
    observer.unsub = this.subscriber(observer);
    return {
      unsubscribe() {
        observer.unsubscribe();
      }
    };
  }

  /**
   * Debounce function
   *
   * @param {number} time
   * @returns
   * @memberof Observable
   */
  public debounce(time: number) {
    return new Observable((observer: Observer) => {
      let timeout: any = null;

      const subscription = this.subscribe({
        next: (val: any) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            observer.next(val);
          }, time);
        },
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      });

      return subscription.unsubscribe;
    });
  }

  /**
   * Map all values and transform them
   * Returns new array
   *
   * @param {*} transform
   * @returns new Observable
   * @memberof Observable
   */
  public map(exp: any) {
    return new Observable((observer: Observer) => {
      const subscription = this.subscribe({
        next: (val: any) => observer.next(exp(val)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      });

      return subscription.unsubscribe;
    });
  }

  /**
   * Filter values with expression
   *
   * @param {*} exp
   * @returns new Observable
   * @memberof Observable
   */
  public filter(exp: any) {
    return new Observable((observer: Observer) => {
      const subscription = this.subscribe({
        next: (val: any) => exp(val) && observer.next(val),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      });

      return subscription.unsubscribe;
    });
  }
}

/**
 * Create new observable attached to values
 *
 * @param {*} [values]
 * @returns new Observable
 */
export const create = (values?: any) => {
  return new Observable((observer: Observer) => {
    if (isArray(values)) {
      values.forEach((val: any) => observer.next(val));
    } else if (isObject(values)) {
      Object.entries(values).forEach((target: any) => observer.next(target));
    }

    observer.complete();

    return () => {
      console.log("Observable.create: complete");
    };
  });
};

/**
 * Create new observable attached to event listener
 *
 * @param {HTMLElement} element
 * @param {string} eventName
 * @returns new Observable
 */
export const fromEvent = (element: Element, eventName: string) => {
  return new Observable((observer: Observer) => {
    const handler = (e: any) => observer.next(e);
    element.addEventListener(eventName, handler, false);

    return () => {
      element.removeEventListener(eventName, handler, false);
      observer.complete();
    };
  });
};
