import Components from "./components";
import { $, $$ } from "./lib/DOM";
import I18n from "./lib/i18n";
import { parseComponent } from "./lib/Parser";
import Router from "./lib/Router";

class App {
  private selector: string = "#app";
  private router: typeof Router = Router;
  private lang: typeof I18n = I18n;

  constructor() {
    //
  }

  public run() {
    this.lang.load();
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
      btn.addEventListener("click", () => {
        const path = btn.dataset.routerGo;
        this.router.go(path);
      });
    });
  }
}

export default new App();
