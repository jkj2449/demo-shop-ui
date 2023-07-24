export default {
  namespaced: true,
  state: () => {
    return {
      carts: [],
      items: [],
    };
  },
  getters: {
    getItems: (state) => {
      return state.items;
    },
    getCarts: (state) => {
      return state.carts;
    },
  },
  mutations: {
    SET_CARTS(state, payload) {
      state.carts = payload;
      state.items = payload.map((v) => v.item);
    },
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
  },
  actions: {
    setCarts: (context, payload) => {
      context.commit("SET_CARTS", payload);
    },
    setItems: (context, payload) => {
      context.commit("SET_ITEMS", payload);
    },
  },
};
