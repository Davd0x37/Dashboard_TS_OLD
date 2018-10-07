// import {Authenticate, DigitalOcean, Header, Paypal, Spotify} from "./components";
import Components from "./components";
import Router from "./controller/Router";
import { $ } from "./utils/DOM";
import { parseComponent } from "./utils/Parser";

class App {
  private selector: string = "#app";
  private router: typeof Router = Router;
  constructor() {
    //
  }

  public run() {
    const components = this.render();
    this.mounted(components);
  }

  private render(): string[] {
    const template = this.routeTemplates();
    const parsed = parseComponent(template, Components);
    $(this.selector)!.innerHTML = parsed.template;
    return parsed.components;
  }

  private mounted(cmp: any[]): void {
    cmp.forEach((comp: string) => {
      // @ts-ignore
      Components[comp].mounted();
    });
  }

  private routeTemplates(): string {
    const path = window.location.pathname;
    const template = this.router.getPathTemplate(path);
    return (template && template()) || this.router.notFound();
  }
}

export default new App();
