import axios from "axios";
import store from "@/store/store";

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
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
