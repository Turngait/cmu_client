function getInitState() {
  return {
    token: "",
    isAuth: false,
    email: "",
    name: "",
    balance: 0,
    activeAccount: -1,
    settings: {
      locale: "en",
      currency: "USD",
      currSign: "$",
    },
    budgets: [],
    onboarding: null,
    month: new Date().toISOString().slice(0, 7),
  };
}
export default {
  namespaced: true,
  state: getInitState(),
  getters: {
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return state.isAuth;
    },
    balance(state) {
      return state.balance;
    },
    budgets(state) {
      return state.budgets;
    },
    month(state) {
      return state.month;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      if (payload.length > 0) state.isAuth = true;
    },
    setBudget(state, payload) {
      if (Array.isArray(payload)) state.budgets = payload;
    },
    setBalance(state, payload) {
      if (typeof payload === "number") state.balance = payload;
    },
    setName(state, payload) {
      if (typeof payload === "string") state.name = payload;
    },
    setMonth(state, payload) {
      if (typeof payload === "string") state.month = payload;
    },
    resetState(state) {
      Object.assign(state, getInitState());
    },
  },
  actions: {},
};
