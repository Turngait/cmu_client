import { createStore } from "vuex";

import costs from "./costs";
import incomes from "./incomes";
import user from "./user";
import accounts from "./accounts";


export default new createStore({
  modules: {
    costs,
    incomes,
    user,
    accounts,
  },
});
