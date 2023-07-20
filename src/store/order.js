export default {
  namespaced: true,
  state: () => {
    return {
      carts: [],
    };
  },
  getters: {
    getItems: (state) => {
      return state.carts.map((v) => v.item);
    },
    getCarts: (state) => {
      return state.carts;
    },
  },
  mutations: {
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
  },
  actions: {
    setCarts: (context, payload) => {
      context.commit("SET_CARTS", payload);
    },
  },
};
