import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import authStore from "./auth.js";

export default createStore({
  modules: {
    authStore: authStore,
  },
  plugins: [
    createPersistedState({
      paths: ["authStore"],
    }),
  ],
});
