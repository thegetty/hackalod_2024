import Vue from "vue";
import App from "./App.vue";
import { GettyUICore } from "@thegetty/getty-ui";
import { messages } from "@/locales/index.js";
import VueI18n from "vue-i18n";
import router from "./router";

Vue.use(VueI18n);
// Initialize the internationalization plugin
const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

Vue.use(GettyUICore);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
  router,
}).$mount("#app");
