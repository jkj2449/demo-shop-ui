import axios from "./http";

const api = {
  singIn: (payload) => {
    return axios.post("/api/v1/singIn", payload);
  },

  singUp: (payload) => {
    return axios.post("/api/v1/singUp", payload);
  },
};

export default api;
