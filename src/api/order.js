import axios from "./http";

const api = {
  order: (payload) => {
    return axios.post("/v1/order", payload);
  },
  findOrders: (payload) => {
    return axios.get(`/v1/orders/${payload.memberId}`, { params: payload });
  },
};

export default api;
