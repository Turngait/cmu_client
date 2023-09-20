function getInitState() {
  return {
    incomes: [],
    sources: [],
    graphData: null,
    incomesByPeriod: 0,
  };
}

export default {
  namespaced: true,
  state: getInitState(),
  getters: {
    incomes(state) {
      return state.incomes;
    },
    incomesSources(state) {
      return state.sources;
    },
    incomesByPeriod(state) {
      return state.costsByPeriod;
    },
  },
  mutations: {
    setIncomes(state, payload) {
      state.incomes = payload;
    },
    setSources(state, payload) {
      state.sources = payload;
    },
    setIncomesByPeriod(state, payload) {
      state.incomesByPeriod = payload;
    },
    resetState(state) {
      Object.assign(state, getInitState());
    },
  },
  actions: {},
};
