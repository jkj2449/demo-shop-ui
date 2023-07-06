import axios from "axios";
import store from "@/store/store";
import router from "@/router/router";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(
  function (config) {
    if (store.state.authStore.authorization) {
      config.headers.Authrozation = store.state.authStore.authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      store.dispatch("authStore/setAuthorization", null);
      store.dispatch("authStore/setUser", {});
      router.push({ name: "SignIn" });
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
