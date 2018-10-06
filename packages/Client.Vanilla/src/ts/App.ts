import Components from "./components";
import Router from "./controller/Router";
import { $, $$ } from "./utils/DOM";
import { extractComponents, parseComponent } from "./utils/Parser";

class App {
  private selector: string = "#app";
  private router: typeof Router = Router;
  constructor() {
    //
  }

  public render(): void {
    const template = this.routeTemplates();
    const parsed = parseComponent(template, Components);
    $(this.selector)!.innerHTML = parsed
    console.log(parsed)
  }  

  public mount(): void {
    // this.routeButtons()
    // console.log(extractComponents(this.routeTemplates()))
  }

  private routeTemplates(): string {
    const path = window.location.pathname;
    const template = this.router.getPathTemplate(path);
    return (template && template()) || this.router.notFound();
  }

  // private routeButtons(): void {
    // const buttons = $$("[data-link]");
  //   buttons.forEach((btn: any) => {
  //     btn.addEventListener("click", (e: any) => {
  //       const title = btn.dataset.link;
  //       history.pushState({ title }, title, title);
  //       this.render();
  //     });
  //   });
  // }
}

export default new App();
