import { createStore } from "vuex";
import authStore from "./auth.js";

export default createStore({
  modules: {
    authStore: authStore,
  },
});
