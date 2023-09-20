<template>
  <Overlay v-slot="slotProps">
    <Preloader v-if="isLoading" />
    <div class="costs" v-else>
      <FirstTimeCosts v-if="onBoarding.firstTime" :onClose="closeFirstTime" />
      <TargetManagementModalVue
        v-if="isTargetManagementOpen"
        :groups="groups"
        :onClose="targetManagementToggle"
        :addTarget="addTarget"
        :targets="targets"
        :deleteTarget="deleteTarget"
        :editTarget="editTarget"
      />
      <FilteredCostsModal
        v-if="filteredCosts"
        :filteredCosts="filteredCosts"
        :onClose="closeFilteredCostsModal"
      />
      <AddCostModal
        v-if="addCostModalOpen"
        :onClose="addCostToggle"
        :groups="groups"
        :budgets="budgets"
        :addCost="addCost"
        :addGroup="addGroup"
        :msg="msg"
      />
      <TopMenu
        :logOut="slotProps.logOut"
        :balance="balance"
        :pageName="$t('common.costs')"
        :changePeriod="changePeriod"
        :period="period"
        :accLatter="accLatter"
      />
      <!-- TODO Move this to another component -->
      <div class="costs__container">
        <div v-if="costs.length > 0">
          <div class="costs__container__targetsBox">
            <h3 class="costs__total">
              {{ $t("common.inThisMonth") }}: {{ inThisMonth }} {{ currency }}
            </h3>
            <div class="costs__container__targetsBox__targetManagement">
              <button
                @click="targetManagementToggle"
                class="costs__container__targetsBox__openTManagementBtn"
              >
                {{ $t("costs.targetsManagement") }}
              </button>
              <button
                @click="isMonthlyTargetsOpenToggle"
                class="costs__container__targetsBox__openTManagementBtn"
              >
                {{
                  !isMonthlyTargetsOpen
                    ? $t("costs.showMonthlyTarget")
                    : $t("costs.hideMonthlyTarget")
                }}
              </button>
            </div>
          </div>
          <div
            class="costs__container__monthlyTargetsBox"
            v-if="isMonthlyTargetsOpen"
          >
            <div
              v-for="target of targets.month"
              :key="target.id"
              class="costs__container__monthlyTargetsBox__item"
            >
              {{ $t("costs.group") }}:
              {{ showTargetGroupName(+target.group_id) }} - {{ target.amount
              }}{{ currency }}. {{ $t("costs.total") }} - {{ target.groupSum
              }}{{ currency }}
            </div>
          </div>
          <Day
            v-for="item in costs"
            :key="item.period"
            :data="item"
            :deleteCost="deleteCost"
            :filterCostsByGroup="filterCostsByGroup"
            :filteredCostsByBudget="filteredCostsByBudget"
            :targets="targets"
          />
        </div>
        <div v-else class="costs__container__noCost">
          {{ $t("costs.noCosts") }}
        </div>
      </div>
      <AddBigBtn :onClick="addCostToggle" />
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../../components/partials/Overlay.vue";
import TopMenu from "../../components/partials/TopMenu.vue";
import Day from "./Components/Day.vue";
import AddBigBtn from "../../components/controls/AddBigBtn.vue";
import AddCostModal from "./Modals/AddCostModal.vue";
import Preloader from "../../components/partials/Preloader.vue";
import FilteredCostsModal from "./Modals/FilteredCostsModal.vue";
import TargetManagementModalVue from "./Targets/TargetManagementModal.vue";
import FirstTimeCosts from "../../components/onboarding/FirstTimeCosts.vue";

import {
  getActiveAccount,
  getFinData,
  showGroupName,
  addSumOfGroupsOnTargets,
} from "../../utils";

import {
  addCostToAPI,
  deleteCostItemService,
  addGroupService,
  addTargetToAPI,
  deleteTargetFromAPI,
  editTargetFromAPI,
  filteredCostByGroupIdService,
  filteredCostByBudgetIdService,
} from "./services";

export default {
  name: "costs-main",
  data() {
    return {
      addCostModalOpen: false,
      costs: [],
      groups: [],
      budgets: [],
      targets: [],
      currency: "USD",
      msg: "",
      isLoading: false,
      balance: 0,
      inThisMonth: 0,
      period: this.$store.state.user.month,
      accLatter: "",
      filteredCosts: null,
      isTargetManagementOpen: false,
      isMonthlyTargetsOpen: false,
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
    AddCostModal,
    Preloader,
    FilteredCostsModal,
    TargetManagementModalVue,
    FirstTimeCosts,
  },
  methods: {
    showTargetGroupName(group_id) {
      return showGroupName(group_id, this.groups);
    },
    isMonthlyTargetsOpenToggle() {
      this.isMonthlyTargetsOpen = !this.isMonthlyTargetsOpen;
    },
    addCostToggle() {
      this.addCostModalOpen = !this.addCostModalOpen;
      this.msg = "";
    },
    targetManagementToggle() {
      this.isTargetManagementOpen = !this.isTargetManagementOpen;
    },
    async addTarget(target) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await addTargetToAPI(
        target,
        token,
        (msg) => (this.msg = msg)
      );
      this.isLoadingToggle(false);
      if (result === 202) {
        await this.getData();
        this.$toast(this.$t("notifications.targetAdded"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async deleteTarget(id) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await deleteTargetFromAPI(
        id,
        token,
        (msg) => (this.msg = msg)
      );
      this.isLoadingToggle(false);
      if (result === 202) {
        await this.getData();
        this.$toast(this.$t("notifications.targetOnDelete"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async editTarget(target) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await editTargetFromAPI(
        target,
        token,
        (msg) => (this.msg = msg)
      );
      this.isLoadingToggle(false);
      if (result === 202) {
        await this.getData();
        this.$toast(this.$t("notifications.targetOnEdit"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async addCost(cost) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await addCostToAPI(cost, token, (msg) => (this.msg = msg));
      this.isLoadingToggle(false);
      if (result === 202) {
        this.addCostToggle();
        await this.getData();
        this.$toast(this.$t("notifications.costOnAdd"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async addGroup(group) {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const result = await addGroupService(
        group,
        token,
        this.setCosts,
        (msg) => {
          this.msg = msg;
          setTimeout(() => (this.msg = ""), 4000);
        }
      );
      this.isLoadingToggle(false);
      if (result) await this.getData();
      return result;
    },
    setCosts(data) {
      this.costs = data.costs;
      this.groups = data.groups;
    },
    setBalance(balance) {
      this.balance = balance;
      this.$store.commit("user/setBalance", balance);
    },
    async deleteCost(costId) {
      const token = localStorage.getItem("token");
      const cost = this.getCostByID(costId);
      const result = await deleteCostItemService(
        cost,
        token,
        this.setCosts,
        this.setBalance
      );

      if (result) {
        await this.onMounted();
        this.$toast(this.$t("notifications.costOnDelete"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    isLoadingToggle(state) {
      this.isLoading = state;
    },
    getCostByID(id) {
      let cost = [];
      for (const days of this.costs) {
        cost = days.items.filter((item) => +item.id === +id);
        if (cost.length) return cost[0];
      }
      return cost;
    },
    filterCostsByGroup(groupId) {
      this.filteredCosts = filteredCostByGroupIdService(groupId, this.costs);
    },
    closeFilteredCostsModal() {
      this.filteredCosts = null;
    },
    filteredCostsByBudget(budgetId) {
      this.filteredCosts = filteredCostByBudgetIdService(budgetId, this.costs);
    },
    // TODO  move it to wrapper
    async onMounted() {
      // TODO optimize code
      this.costs = this.$store.getters["costs/costs"];
      this.groups = this.$store.getters["costs/costsGroup"];
      this.budgets = this.$store.getters["user/budgets"];
      this.balance = this.$store.getters["user/balance"];

      if (!this.costs.length || !this.balance.length || !this.budgets.length) {
        await this.getData();
      }
      this.inThisMonth =
        this.costs.length > 0
          ? this.costs[this.costs.length - 1].spentByThisMonth
          : 0;
    },
    async getData() {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const { costs, budgets, accounts, targets } = await getFinData(
        token,
        this.period,
        accountId
      );
      const activeAccount = getActiveAccount(accounts);
      this.accLatter = activeAccount.title[0];
      this.groups = costs.groups;
      this.budgets = budgets;
      this.balance = activeAccount.balance;
      this.costs = costs.costs;
      this.targets = addSumOfGroupsOnTargets(targets, costs);
      this.inThisMonth =
        this.costs.length > 0
          ? this.costs[this.costs.length - 1].spentByThisMonth
          : 0;
      this.setDataToStore(costs, budgets, activeAccount.balance, targets);
    },
    setDataToStore(costs, budget, balance, targets) {
      this.$store.commit("costs/setCosts", costs.costs);
      this.$store.commit("costs/setGroups", costs.groups);
      this.$store.commit("user/setBudget", budget);
      this.$store.commit("user/setBalance", balance);
      this.$store.commit("costs/setTargets", targets);
    },
    async changePeriod(newPeriod) {
      // TODO Optimize code
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const { costs, budgets, accounts, targets } = await getFinData(
        token,
        newPeriod
      );
      const activeAccount = getActiveAccount(accounts);
      this.isLoadingToggle(false);

      if (costs && budgets) {
        this.setDataToStore(costs, budgets, activeAccount.balance, targets);
        this.costs = costs.costs;
        this.groups = costs.groups;
        this.budgets = budgets;
        this.balance = activeAccount.balance;
        this.period = newPeriod;
        this.inThisMonth =
          this.costs.length > 0
            ? this.costs[this.costs.length - 1].spentByThisMonth
            : 0;
        this.$store.commit("user/setMonth", newPeriod);
      }
    },
    closeFirstTime() {
      this.onBoarding.firstTime = false;
      localStorage.setItem("onBFirstTimeCosts", true);
    },
    checkOnboarding() {
      if (!localStorage.getItem("onBFirstTimeCosts")) {
        this.onBoarding.firstTime = true;
      }
    },
  },
  async mounted() {
    this.checkOnboarding();
    this.isLoadingToggle(true);
    await this.onMounted();
    this.currency = localStorage.getItem("currency");
    this.isLoadingToggle(false);
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
