import { getMetadataKeys } from "./controller/Component";

class App {
  constructor() {
    //
  }

  public create() {
    //
  }

  public render(where: string, comps: any[], createDiv: boolean = true) {
    const element = document.querySelector(where)!;
    getMetadataKeys(comps).forEach(comp => {
      if(createDiv) {
        const compContainer = document.createElement("div")
        compContainer.id = comp.component.constructor.name
        compContainer.innerHTML = comp.component.render();
        element.appendChild(compContainer)
      }else{
        element.innerHTML = comp.component.render()
      }
    });
  }
}

export default new App();
