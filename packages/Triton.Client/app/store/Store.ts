import Actions from "./Actions";
import Mutations from "./Mutations";
import { State } from "./State";

import Store from "#SH/Store";

export default new Store({
  actions: Actions,
  mutations: Mutations,
  state: State
});
