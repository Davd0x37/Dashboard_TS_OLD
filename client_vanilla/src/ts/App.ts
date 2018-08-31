import Storage from "./controller/Storage";
import { QueryUser } from "./controller/User";
import { View } from "./controller/View";

const App = {
  isOnline: navigator.onLine,
  async getUserId(): Promise<string> {
    let id = "";
    if (this.isOnline) {
      await QueryUser.authenticate("ASasdDd", "test");
      id = document.cookie.split("=")[1];
    } else {
      id = Storage.store.userId;
    }
    return id;
  }
};

export default {
  async create() {
    const id = await App.getUserId();
    View.renderHeader();
    View.renderPlates();
    Storage.create(id, View.updatePlates);
  }
};
