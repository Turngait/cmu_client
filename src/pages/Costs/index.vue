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
      <DialogModal v-if="dialogModalOpen" :text="dialogModalText" :onClose="closeDialogModal" :onSubmit="dialogModalOnSubmit"/>
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
          <CostsInfo
            :inThisMonth="inThisMonth"
            :currency="currency"
            :targetManagementToggle="targetManagementToggle"
            :showMonthTargets="this.targets.month.length"
            :isMonthlyTargetsOpen="isMonthlyTargetsOpen"
            :isMonthlyTargetsOpenToggle="isMonthlyTargetsOpenToggle"
          />
          <MonthlyTargetsInfo
            v-if="isMonthlyTargetsOpen"
            :targets="targets"
            :showTargetGroupName="showTargetGroupName"
            :currency="currency"
          />
          <Day
            v-for="item in costs"
            :key="item.period"
            :data="item"
            :deleteCost="onDeleteCost"
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
import DialogModal from "@/components/partials/DialogModal.vue";
import CostsInfo from "./Components/CostsInfo.vue";
import MonthlyTargetsInfo from '@/pages/Costs/Targets/MonthlyTargetsInfo';

import {
  getActiveAccount,
  getFinData,
  showGroupName,
  addSumOfGroupsOnTargets,
  getCostByID
} from "../../utils";

import {
  getData,
  addCostService,
  deleteCostItemService,
  addGroupService,
  addTargetService,
  deleteTargetService,
  editTargetFromAPI,
  filteredCostByGroupIdService,
  filteredCostByBudgetIdService,
} from '../../services';

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
      dialogModalOpen: false,
      dialogModalText: "",
      dialogModalOnSubmit: null,
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
    DialogModal,
    CostsInfo,
    MonthlyTargetsInfo
  },
  methods: {
    closeDialogModal() {
      this.dialogModalOpen = false;
    },
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
      const result = await addTargetService(target, (msg) => (this.msg = msg))

      this.isLoadingToggle(false);
      if (result === 202) {
        await getData(this.period, this.setDataToComponent);
        this.$toast.info(this.$t("notifications.targetAdded"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async deleteTarget(id) {
      this.isLoadingToggle(true);
      const result = await deleteTargetService(id, (msg) => (this.msg = msg))
      this.isLoadingToggle(false);
      if (result === 202) {
        await getData(this.period, this.setDataToComponent);
        this.$toast.info(this.$t("notifications.targetOnDelete"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
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
        await getData(this.period, this.setDataToComponent);
        this.$toast.info(this.$t("notifications.targetOnEdit"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async addCost(cost) {
      this.isLoadingToggle(true);
      const result = await addCostService(cost, (msg) => (this.msg = msg));
      this.isLoadingToggle(false);
      if (result === 202) {
        this.addCostToggle();
        await getData(this.period, this.setDataToComponent);
        this.$toast.info(this.$t("notifications.costOnAdd"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
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
      if (result) await getData(this.period, this.setDataToComponent);
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
    async onDeleteCost(costId) {
      this.dialogModalOnSubmit = () => this.deleteCost(costId);
      this.dialogModalText = "Are want to delete this?";
      this.dialogModalOpen = true;
    },
    async deleteCost(costId) {
      this.dialogModalOpen = false;
      const token = localStorage.getItem("token");
      const cost = getCostByID(costId, this.costs);
      const result = await deleteCostItemService(
        cost,
        token,
        this.setCosts,
        this.setBalance
      );

      if (result) {
        await getData(this.period, this.setDataToComponent);
        this.$toast.info(this.$t("notifications.costOnDelete"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    isLoadingToggle(state) {
      this.isLoading = state;
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
      this.isLoadingToggle(true);
      this.currency = localStorage.getItem("currency");
      // TODO optimize code
      this.costs = this.$store.getters["costs/costs"];
      this.groups = this.$store.getters["costs/costsGroup"];
      this.budgets = this.$store.getters["user/budgets"];
      this.balance = this.$store.getters["user/balance"];

      if (!this.costs.length || !this.balance.length || !this.budgets.length) {
        await getData(this.period, this.setDataToComponent);
      }
      this.isLoadingToggle(false);
    },
    setDataToComponent(costs, budgets, accounts, targets) {
      const activeAccount = getActiveAccount(accounts);
      this.accLatter = activeAccount.title[0];
      this.groups = costs.groups;
      this.budgets = budgets;
      this.balance = activeAccount.balance;
      this.costs = costs.costs;
      if (targets.month) this.targets = addSumOfGroupsOnTargets(targets, costs);
      this.inThisMonth = costs.statistics.spentByMonth;
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
      const accountId = localStorage.getItem("accountId");
      const { costs, budgets, accounts, targets } = await getFinData(
        token,
        newPeriod,
        accountId
      );
      const activeAccount = getActiveAccount(accounts);
      this.isLoadingToggle(false);

      if (costs && budgets) {
        this.setDataToStore(costs, budgets, activeAccount.balance, targets);
        this.setDataToComponent(costs, budgets, accounts, targets);
        this.period = newPeriod;
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
    await this.onMounted();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
