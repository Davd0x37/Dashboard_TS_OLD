// tslint:disable
export interface IHandlers {
  next: (value?: any) => any;
  error?: (err: any) => void;
  complete?: () => void;
}

export class Observer {
  public unsub?: () => any;
  protected handler: IHandlers;
  protected unsubscribed: boolean = false;

  constructor(handler: IHandlers) {
    this.handler = handler;
  }

  public next(val?: any) {
    if (this.handler.next && !this.unsubscribed) {
      this.handler.next(val);
    }
  }

  public error(err: any) {
    if (!this.unsubscribed) {
      if (this.handler.error) {
        this.handler.error(err);
      }
      this.unsubscribe();
    }
  }

  public complete() {
    if (!this.unsubscribed) {
      if (this.handler.complete) {
        this.handler.complete();
      }

      this.unsubscribe();
    }
  }

  public unsubscribe() {
    this.unsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}