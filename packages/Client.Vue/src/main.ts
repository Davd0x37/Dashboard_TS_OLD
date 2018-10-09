import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Icon from "vue-awesome/components/Icon.vue";
import "@/registerServiceWorker";
import "vue-awesome/icons";

import Storage from "@/controllers/Storage";

Vue.config.productionTip = false;

Vue.component("v-icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

if (!navigator.onLine) {
  const data = Storage.getStorage();
  if (data !== null) {
    store.dispatch("update_user_data", data);
  }
}