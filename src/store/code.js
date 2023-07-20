export default {
  namespaced: true,
  state: () => {
    return {
      codes: {},
    };
  },
  mutations: {
    SET_CODES(state, payload) {
      state.codes = payload;
    },
  },
  actions: {
    setCodes: (context, payload) => {
      context.commit("SET_CODES", payload);
    },
  },
  getters: {
    getCodesByName: (state) => (codeName) => {
      return state.codes[codeName];
    },
  },
};
