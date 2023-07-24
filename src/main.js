import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/store";
import PaginationPlugin from "vue3-basic-pagination";
import "vue3-basic-pagination/styles";
import customGlobalProperties from "./util/index";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(router)
  .use(store)
  .use(PaginationPlugin)
  .use(Toast, { position: "bottom-right" })
  .use(customGlobalProperties)
  .mount("#app");
