import axios from "./http";

const api = {
  signIn: (payload) => {
    return axios.post("/v1/signIn", payload);
  },

  signUp: (payload) => {
    return axios.post("/v1/signUp", payload);
  },
  signOut: (payload) => {
    return axios.post("/v1/signOut", payload);
  },
  refresh: () => {
    return axios.get("/v1/refresh");
  },
};

export default api;
