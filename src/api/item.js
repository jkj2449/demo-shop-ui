import axios from "./http";

const api = {
  findItems: () => {
    return axios.get("/v1/items");
  },
};

export default api;
