export default {
  namespaced: true,
  state: () => {
    return {
      authorization: null,
      user: {},
    };
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_AUTHORIZATION(state, payload) {
      state.authorization = payload;
    },
  },
  actions: {
    setUser: async (context, payload) => {
      context.commit("SET_USER", payload);
    },
    setAuthorization: async (context, payload) => {
      context.commit("SET_AUTHORIZATION", payload);
    },
  },
};
