import Components from "../components";
import { $, $$ } from "../utils/DOM";
import { fromEvent } from "./Observable";
import { parseComponent } from "./Parser";
import View from "./View";

export default {
  selector: "#app",
  components: [] as any,
  async run() {
    await this.render();
    await this.mounted();
  },

  async render() {
    const location = this.getPath();
    const getView = await View.getView(location);
    const view = (getView && getView()) || View.notFound();
    const parsed = await parseComponent(view, Components);
    $(this.selector)!.innerHTML = parsed.template;
    this.components = parsed.components;
  },

  mounted() {
    for (const comp of this.components) {
      if (Components[comp].mounted !== undefined) {
        Components[comp].mounted();
      }
    }
    this.routeButtons();
  },

  getPath(): string {
    return window.location.pathname;
  },

  routeButtons() {
    const buttons = $$("[data-router-go]");
    buttons.forEach((btn: any) => {
      fromEvent(btn, "click").subscribe({
        next: async () => {
          const path = btn.dataset.routerGo;
          await this.go(path);
        }
      });
    });
  },

  async go(path: string) {
    history.pushState({}, path, path);
    await this.run();
  }
};
