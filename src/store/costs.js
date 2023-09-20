function getInitState() {
  return {
    costs: [],
    groups: [],
    graphData: null,
    costsByPeriod: 0,
    targets: [],
  };
}

export default {
  namespaced: true,
  state: getInitState(),
  getters: {
    costs(state) {
      return state.costs;
    },
    costsGroup(state) {
      return state.groups;
    },
    costsByPeriod(state) {
      return state.costsByPeriod;
    },
    targets(state) {
      return state.targets;
    },
  },
  mutations: {
    setCosts(state, payload) {
      state.costs = payload;
    },
    setGroups(state, payload) {
      state.groups = payload;
    },
    setCostsByPeriod(state, payload) {
      state.costsByPeriod = payload;
    },
    setTargets(state, payload) {
      state.targets = payload;
    },
    resetState(state) {
      Object.assign(state, getInitState());
    },
  },
  actions: {},
};
