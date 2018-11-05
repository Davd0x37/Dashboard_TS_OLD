import Components from '#/components';
import { IDashboardDatabaseCollections } from '#/db/Types';
import Store from '#/store/Store';
import { $, $$ } from '#/utils/DOM';
import { fromEvent } from '#SH/Observable/Observable';
import { RxDatabase } from 'rxdb';

import { parseComponent } from './Parser';
import View from './View';

class App {
  public db!: RxDatabase<IDashboardDatabaseCollections>;
  private selector: string = "#app";
  private components: any;

  public init(db: RxDatabase<IDashboardDatabaseCollections>) {
    this.db = db;
  }

  public async loadStore() {
    const user = await this.db.dashboard.findOne().exec();
    if (user !== null) {
      const data = {
        id: user.id,
        User: user.User,
        Spotify: user.Spotify,
        DigitalOcean: user.DigitalOcean,
        Paypal: user.Paypal
      };
      await Store.dispatch("updateAllData", data);
    }
  }

  public async run() {
    await this.render();
    await this.mounted();
  }

  public async render() {
    const location = this.getPath();
    const getView = await View.getView(location);
    const view = (getView && getView()) || View.notFound();
    const parsed = await parseComponent(view, Components);
    $(this.selector)!.innerHTML = parsed.template;
    this.components = parsed.components;
  }

  public mounted() {
    for (const comp of this.components) {
      if (Components[comp].mounted !== undefined) {
        Components[comp].mounted();
      }
    }
    this.routeButtons();
  }

  public getPath(): string {
    return window.location.pathname;
  }

  public async go(path: string) {
    history.pushState({}, path, path);
    await this.run();
  }

  private routeButtons() {
    const buttons = $$("[data-router-go]");
    buttons.forEach((btn: any) => {
      fromEvent(btn, "click").subscribe({
        next: async () => {
          const path = btn.dataset.routerGo;
          await this.go(path);
        }
      });
    });
  }

}

export default new App();
