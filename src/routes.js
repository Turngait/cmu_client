import { createRouter, createWebHistory } from "vue-router";

import Index from "./pages/Index/index.vue";
import Dashboard from "./pages/Dashboard/index.vue";
import Costs from "./pages/Costs/index.vue";
import Incomes from "./pages/Incomes/index.vue";
import Budgets from "./pages/Budgets/index.vue";
import GroupManagement from "./pages/Groups/index.vue";
import Profile from "./pages/Profile/index.vue";
import Accounts from "./pages/Accounts/index.vue";

const router = createRouter({
  routes: [
    {
      path: "",
      name: "index",
      component: Index,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "dashboard",
    },
    {
      path: "/costs",
      name: "costs",
      component: Costs,
    },
    {
      path: "/incomes",
      name: "incomes",
      component: Incomes,
    },
    {
      path: "/budgets",
      name: "budgets",
      component: Budgets,
    },
    {
      path: "/groups",
      name: "groups",
      component: GroupManagement,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/accounts",
      name: "accounts",
      component: Accounts,
    },
  ],
  history: createWebHistory(),
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name === "index") {
    if (token) next({ name: "dashboard" });
    else next();
  } else {
    if (!token) next({ name: "index" });
    else next();
  }
});

export default router;
