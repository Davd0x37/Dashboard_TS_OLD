class View {
  protected view: string

  constructor(view: string) {
    this.view = view
  }

  public render(elem: HTMLElement | HTMLBodyElement): void {
    elem.innerHTML = this.view
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  const view: View = new View(`
<div>asd</div>
`)

  view.render(document.querySelector("body"))
})
