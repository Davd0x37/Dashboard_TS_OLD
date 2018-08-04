import { Component } from "./Component";
export class Search extends Component {

  constructor(el: Element) {
    super(el);
  }

  public update(): void {
    // FILL
  }

  protected create(): void {
    console.log(this.element)
  }
}
