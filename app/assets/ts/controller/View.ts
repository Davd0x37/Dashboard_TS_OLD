let body = document.querySelector("body");

class View {
  private view: string | HTMLElement;
  constructor(view: string | HTMLElement) {
    this.view = view;
  }
}
