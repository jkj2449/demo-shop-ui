import axios from "./http";

const api = {
  findItems: (params) => {
    return axios.get("/v1/items", { params });
  },
};

export default api;
