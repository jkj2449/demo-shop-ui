import axios from "./http";

const api = {
  addCart: (payload) => {
    return axios.post("/v1/cart", payload);
  },
  findCarts: (payload) => {
    return axios.get(`/v1/cart/${payload.memberId}`, { params: payload });
  },
  deleteCarts: (payload) => {
    return axios.delete(`/v1/cart`, { data: payload });
  },
};

export default api;
