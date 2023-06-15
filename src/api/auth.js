import axios from "./http";

const api = {
  signIn: (payload) => {
    return axios.post("/v1/signIn", payload);
  },

  signUp: (payload) => {
    return axios.post("/v1/signUp", payload);
  },
};

export default api;
