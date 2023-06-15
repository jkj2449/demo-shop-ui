export default {
  namespaced: true,
  state: () => {
    return {
      user: {},
    };
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setUser: async (context, payload) => {
      context.commit("SET_USER", payload);
    },
  },
};
