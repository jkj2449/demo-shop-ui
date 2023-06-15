import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/store";
import PaginationPlugin from "vue3-basic-pagination"; // import component
import "vue3-basic-pagination/styles"; // register default styles

createApp(App).use(router).use(store).use(PaginationPlugin).mount("#app");
