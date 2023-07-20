import axios from "./http";

const api = {
  codes: () => {
    return axios.get("/v1/codes");
  },
};

export default api;
