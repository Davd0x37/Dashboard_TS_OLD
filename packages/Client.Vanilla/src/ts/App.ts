import { getMetadataKeys } from "./controller/Component";

class App {
  constructor() {
    //
  }

  public create() {
    //
  }

  public render(where: string, comps: any[]) {
    let template = "";
    const feed = document.querySelector(where)!;
    getMetadataKeys(comps).forEach(comp => {
      template += comp.component.render();
    });
    feed.innerHTML = template;
  }
}

export default new App();
