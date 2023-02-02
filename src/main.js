import Vue from "vue";
import App from "./App.vue";
import "./assets/style/style.sass";
import { ValidationProvider } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
import mask from "./directives/index.js";
Vue.use(mask);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
