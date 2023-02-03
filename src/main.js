import Vue from "vue";
import App from "./App.vue";
import "./assets/style/style.sass";
import { ValidationObserver, ValidationProvider } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationOserver", ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
