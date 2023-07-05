import axios from "./http";

const api = {
  findItems: (payload) => {
    return axios.get("/v1/items", { params: payload });
  },
};

export default api;
