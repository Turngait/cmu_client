function getInitState() {
  return {
    accounts: [],
  };
}

export default {
  namespaced: true,
  state: getInitState(),
  getters: {
    accounts(state) {
      return state.accounts;
    },
  },
  mutations: {
    setAccounts(state, payload) {
      state.accounts = payload;
    },
    resetState(state) {
      Object.assign(state, getInitState());
    },
  },
  actions: {},
};
