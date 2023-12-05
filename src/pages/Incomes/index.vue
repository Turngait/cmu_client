<template>
  <Overlay v-slot="slotProps">
    <Preloader v-if="isLoading" />
    <div class="incomes" v-else>
      <FirstTimeIncomes v-if="onBoarding.firstTime" :onClose="closeFirstTime" />
      <FilteredIncomesModal
        v-if="filteredIncomes"
        :filteredIncomes="filteredIncomes"
        :onClose="closeFilteredIncomesModal"
      />
      <AddIncomeModal
        v-if="addIncomeOpen"
        :onClose="addIncomesToggle"
        :sources="sources"
        :budgets="budgets"
        :addIncome="addIncome"
        :addSource="addSource"
        :msg="msg"
      />
      <TopMenu
        :logOut="slotProps.logOut"
        :balance="balance"
        :pageName="$t('common.incomes')"
        :period="period"
        :changePeriod="changePeriod"
        :accLatter="accLatter"
      />
      <div class="incomes__container">
        <div v-if="incomes.length > 0">
          <h3 class="incomes__total">
            {{ $t("common.inThisMonth") }}: {{ inThisMonth }}
          </h3>
          <Day
            v-for="data in incomes"
            :key="data.period"
            :data="data"
            :deleteIncome="deleteIncome"
            :filterIncomesByGroup="filterIncomesByGroup"
            :filteredIncomesByBudget="filteredIncomesByBudget"
          />
        </div>
        <div v-else class="incomes__container__noCost">
          {{ $t("incomes.noIncomes") }}
        </div>
      </div>
      <AddBigBtn :onClick="addIncomesToggle" />
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../../components/partials/Overlay.vue";
import TopMenu from "../../components/partials/TopMenu.vue";
import Day from "./Components/Day.vue";
import AddBigBtn from "../../components/controls/AddBigBtn.vue";
import AddIncomeModal from "./Modals/AddIncomeModal.vue";
import Preloader from "../../components/partials/Preloader.vue";
import FilteredIncomesModal from "./Modals/FilteredIncomesModal.vue";
import FirstTimeIncomes from "../../components/onboarding/FirstTimeIncomes.vue";

import { getFinData, getActiveAccount } from "../../utils";
import {
  addIncomeService,
  deleteIncomeService,
  addSourceService,
  filteredIncomesByGroupIdService,
  filteredIncomesByBudgetIdService,
} from "./services";

export default {
  name: "incomes-main",
  data() {
    return {
      incomes: [],
      sources: [],
      addIncomeOpen: false,
      budgets: [],
      balance: 0,
      inThisMonth: 0,
      msg: "", // TODO Add msg to view
      isLoading: false,
      period: this.$store.state.user.month,
      accLatter: "",
      filteredIncomes: null,
      onBoarding: {
        firstTime: false,
      },
    };
  },
  components: {
    Overlay,
    TopMenu,
    Day,
    AddBigBtn,
    AddIncomeModal,
    Preloader,
    FilteredIncomesModal,
    FirstTimeIncomes,
  },
  methods: {
    addIncomesToggle() {
      this.addIncomeOpen = !this.addIncomeOpen;
      this.msg = "";
    },
    async addIncome(income) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await addIncomeService(
        income,
        token,
        (msg) => (this.msg = msg)
      );
      this.isLoadingToggle(false);
      if (result) {
        this.addIncomesToggle();
        await this.getData();
        this.$toast.info(this.$t("notifications.incomeOnAdd"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    setIncomes(data) {
      this.incomes = data.incomes;
      this.sources = data.sources;
      this.$store.commit("incomes/setIncomes", data.incomes);
      this.$store.commit("incomes/setSources", data.sources);
    },
    setBalance(balance) {
      this.balance = balance;
      this.inThisMonth =
        this.incomes.length > 0
          ? this.incomes[this.incomes.length - 1].gainByPeriod
          : 0;
      this.$store.commit("user/setBalance", balance);
    },
    async deleteIncome(incomeId) {
      const token = localStorage.getItem("token");
      const income = this.getIncomeByID(incomeId);
      const status = await deleteIncomeService(income, token);
      if (status) {
        await this.getData();
        this.$toast.info(this.$t("notifications.incomeOnDelete"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async addSource(source) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await addSourceService(source, token, (msg) => {
        this.msg = msg;
        setTimeout(() => (this.msg = ""), 4000);
      });
      this.isLoadingToggle(false);
      if (result) await this.getData();
      return result;
    },
    async changePeriod(newPeriod) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      
      const data = await getFinData(token, newPeriod, accountId);
      this.isLoadingToggle(false);
      if (data) {
        const activeAccount = getActiveAccount(data.accounts);
        this.setFinDate(data, activeAccount);
        this.incomes = data.incomes.incomes;
        this.budgets = data.budgets.items;
        this.period = newPeriod;
        this.$store.commit("user/setMonth", newPeriod);
      }
    },
    isLoadingToggle(state) {
      this.isLoading = state;
    },
    // TODO Move to wrapper
    setFinDate(data, activeAccount) {
      this.$store.commit("costs/setCosts", data.costs.costs);
      this.$store.commit("costs/setGroups", data.costs.groups);
      this.$store.commit("user/setBudget", data.budgets);
      this.$store.commit("user/setBalance", activeAccount.balance);
      this.$store.commit("incomes/setIncomes", data.incomes.incomes);
      this.$store.commit("incomes/setSources", data.incomes.sources);
    },
    async onMounted() {
      this.incomes = this.$store.getters["incomes/incomes"];
      this.sources = this.$store.getters["incomes/incomesSources"];
      this.budgets = this.$store.getters["user/budgets"];
      this.balance = this.$store.getters["user/balance"];

      if (!this.incomes.length || !this.budgets.length) {
        await this.getData();
      }
      this.inThisMonth =
        this.incomes.length > 0
          ? this.incomes[this.incomes.length - 1].gainByPeriod
          : 0;
    },
    async getData() {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const data = await getFinData(token, this.period, accountId);
      if (data) {
        const activeAccount = getActiveAccount(data.accounts);
        this.accLatter = activeAccount.title[0];
        this.incomes = data.incomes.incomes;
        this.sources = data.incomes.sources;
        this.budgets = data.budgets;
        this.balance = activeAccount.balance;
        this.setFinDate(data, activeAccount);
        this.setBalance(activeAccount.balance);
      }
    },
    getIncomeByID(id) {
      let income = null;
      for (const days of this.incomes) {
        income = days.items.filter((item) => +item.id == +id);
        if (Array.isArray(income) && income.length) return income[0];
      }
      return income;
    },
    filterIncomesByGroup(groupId) {
      this.filteredIncomes = filteredIncomesByGroupIdService(
        groupId,
        this.incomes
      );
    },
    closeFilteredIncomesModal() {
      this.filteredIncomes = null;
    },
    filteredIncomesByBudget(budgetId) {
      this.filteredIncomes = filteredIncomesByBudgetIdService(
        budgetId,
        this.incomes
      );
    },
    closeFirstTime() {
      this.onBoarding.firstTime = false;
      localStorage.setItem("onBFirstTimeIncomes", true);
    },
    checkOnboarding() {
      if (!localStorage.getItem("onBFirstTimeIncomes")) {
        this.onBoarding.firstTime = true;
      }
    },
  },
  async mounted() {
    this.checkOnboarding();
    this.isLoadingToggle(true);
    await this.onMounted();
    this.isLoadingToggle(false);
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
