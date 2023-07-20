import { createStore } from "vuex";
import authStore from "./auth.js";
import orderStore from "./order.js";
import codeStore from "./code.js";

export default createStore({
  modules: {
    authStore: authStore,
    orderStore: orderStore,
    codeStore: codeStore,
  },
});
