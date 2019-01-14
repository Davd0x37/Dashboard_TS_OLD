import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import i18n from "./i18n";
import { DB } from "./db";
Vue.config.productionTip = false;
// Vue.prototype.$db = DB.load()

// For now, we only accept one account that exists in database.
// 🤔 Maybe use cookies? I do not want to.
DB.load().then(async db => {
  Vue.prototype.$db = db;

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount("#app");
});
