import Components from "./components";
import Router from "./controller/Router";
import { $, $$ } from "./lib/DOM";
import { parseComponent } from "./lib/Parser";

class App {
  private selector: string = "#app";
  private router: typeof Router = Router;
  constructor() {
    //
  }

  public run() {
    const { components } = this.render();
    this.mounted(components);
  }

  private render(): any {
    const template = this.routeTemplates();
    const parsed = parseComponent(template, Components);
    $(this.selector)!.innerHTML = parsed.template;
    return parsed;
  }

  private mounted(cmp: any[]): void {
    cmp.forEach((comp: string) => {
      // @ts-ignore
      Components[comp].mounted();
    });
    this.routeButtons();
  }

  private routeTemplates(): string {
    const path = window.location.pathname;
    const template = this.router.getPathTemplate(path);
    return (template && template()) || this.router.notFound();
  }

  private routeButtons(): void {
    const buttons = $$("[data-router-go]");
    buttons.forEach((btn: any) => {
      btn.addEventListener("click", (e: any) => {
        const path = btn.dataset.routerGo;
        this.router.go(path);
      });
    });
  }
}

export default new App();
