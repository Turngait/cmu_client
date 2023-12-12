<template>
  <div class="budgets">
    <FirstTimeBudgets v-if="onBoarding.firstTime" :onClose="closeFirstTime" />
    <DialogModal v-if="dialogModalOpen" :text="dialogModalText" :onClose="closeDialogModal" :onSubmit="dialogModalOnSubmit"/>
    <BudgetHistoryModal
      :items="historyItems"
      v-if="isHistoryOpen"
      :onClose="openHistoryToggle"
      :currency="currency"
      :balance="balance"
    />
    <AddBudgetModal
      v-if="isAddBudgetOpen"
      :onClose="addBudgetToggle"
      :addBudget="addBudget"
      :msg="msg"
    />
    <EditBudgetModal
      v-if="editingBudget"
      :budget="editingBudget"
      :onClose="closeEditBudget"
      :editBudget="editBudget"
    />
    <TransferBetweenBudgetsModal 
      v-if="isTransferModalOpen"
      :budgets="budgets"
      :onClose="toggleOpenTransferModal"
      :onTransfer="startTransferHandler"
    />
    <TopMenu
      :logOut="logOut"
      :pageName="$t('common.budgets')"
      :balance="balance"
      :period="period"
      :changePeriod="changePeriod"
      :accLatter="accLatter"
    />
    <div class="budgets__container">
      <p class="budgets__msg">{{ msg }}</p>
      <BudgetsManagement
        :onClickTransfer="toggleOpenTransferModal"
        :isTransferPossible="isTransferPossible"
      />
      <div class="budgets__box">
        <Budget
          v-for="item of budgets"
          :key="item.id"
          :item="item"
          :deleteBudget="onDeleteBudget"
          :editBudget="editBudgetOpen"
          :isLast="budgets.length <= 1"
          :currency="currency"
          :openHistory="openHistoryToggle"
        />
      </div>
    </div>
    <AddBigBtn :onClick="addBudgetToggle" />
  </div>
</template>

<script>
import TopMenu from "../../components/partials/TopMenu.vue";
import Budget from "./Components/BudgetItem.vue";
import AddBudgetModal from "./Modals/AddBudgetModal.vue";
import EditBudgetModal from "./Modals/EditBudgetModal.vue";
import BudgetHistoryModal from "./Modals/BudgetHistoryModal.vue";
import AddBigBtn from "../../components/controls/AddBigBtn.vue";
import FirstTimeBudgets from "../../components/onboarding/FirstTimeBudgets.vue";
import DialogModal from "@/components/partials/DialogModal.vue";
import BudgetsManagement from "./Components/BudgetsManagement.vue";
import TransferBetweenBudgetsModal from "./Modals/TransferBetweenBudgetsModal.vue";

import {
  getActiveAccount,
  getFinData,
  getHistoryBudgetItems,
} from "../../utils";

import {
  saveBudgetService,
  deleteBudgetService,
  editBudgetService,
  transferMoneyBetweenBudgetsService,
} from "./services";

export default {
  name: "budgets-main",
  data() {
    return {
      isAddBudgetOpen: false,
      budgets: [],
      editingBudget: null,
      msg: "",
      balance: 0,
      period: this.$store.state.user.month,
      currency: "$",
      accLatter: "",
      isHistoryOpen: false,
      costs: [],
      incomes: [],
      historyItems: {
        costs: [],
        incomes: [],
      },
      onBoarding: {
        firstTime: false,
      },
      dialogModalOpen: false,
      dialogModalText: "",
      dialogModalOnSubmit: null,
      isTransferModalOpen: false,
      isTransferPossible: false
    };
  },
  components: {
    TopMenu,
    Budget,
    AddBigBtn,
    AddBudgetModal,
    EditBudgetModal,
    BudgetHistoryModal,
    FirstTimeBudgets,
    DialogModal,
    BudgetsManagement,
    TransferBetweenBudgetsModal
  },
  methods: {
    toggleOpenTransferModal() {
      this.isTransferModalOpen = !this.isTransferModalOpen;
    },
    async startTransferHandler(fromId, toId, amount) {
      const token = localStorage.getItem("token");
      await transferMoneyBetweenBudgetsService(fromId, toId, amount, token);
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("accountId");
      this.$store.commit("user/resetState");
      this.$store.commit("costs/resetState");
      this.$store.commit("incomes/resetState");
      this.$router.push("/");
    },
    openHistoryToggle(budget_id) {
      this.isHistoryOpen = !this.isHistoryOpen;
      if (this.isHistoryOpen) {
        this.historyItems = getHistoryBudgetItems(
          budget_id,
          this.costs,
          this.incomes
        );
      } else {
        this.historyItems = {
          costs: [],
          incomes: [],
        };
      }
    },
    addBudgetToggle() {
      this.isAddBudgetOpen = !this.isAddBudgetOpen;
    },
    closeEditBudget() {
      this.editingBudget = null;
    },
    async addBudget(budget) {
      const token = localStorage.getItem("token");
      // TODO Add balance
      const result = await saveBudgetService(
        budget,
        token,
        (data) => {
          this.budgets.push(data);
        },
        (msg) => (this.msg = msg)
      );
      if (result) {
        this.$store.commit("user/setBudget", this.budgets);
        this.addBudgetToggle();
        this.$toast.info(this.$t("notifications.budgetOnAdd"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async onDeleteBudget(budgetId) {
      this.dialogModalOnSubmit = () => this.deleteBudget(budgetId);
      this.dialogModalText = "Are want to delete this?";
      this.dialogModalOpen = true;
    },
    async deleteBudget(id) {
      this.dialogModalOpen = false;
      const token = localStorage.getItem("token");
      const isDeleted = await deleteBudgetService(
        id,
        token,
        (msg) => (this.msg = msg)
      );
      if (isDeleted) {
        this.budgets = this.budgets.filter((budget) => budget.id !== id);
        this.$toast.info(this.$t("notifications.budgetOnDelete"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    editBudgetOpen(id) {
      const editingBudget = this.budgets.filter((item) => item.id === id);
      this.editingBudget = editingBudget[0];
    },
    async editBudget(budget) {
      const token = localStorage.getItem("token");
      const result = await editBudgetService(
        budget,
        token,
        (msg) => (this.msg = msg)
      );
      if (result) {
        for (let item of this.budgets) {
          if (item.id === budget.id) item.title = budget.title;
        }
        this.closeEditBudget();
        this.$toast.info(this.$t("notifications.budgetOnEdit"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async changePeriod(newPeriod) {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const data = await getFinData(token, newPeriod, accountId);
      if (data) {
        this.setFinDate(data);
        this.period = newPeriod;
        this.$store.commit("user/setMonth", newPeriod);
      }
    },

    // TODO Move to wrapper
    setFinDate(data) {
      const activeAccount = getActiveAccount(data.accounts);
      this.accLatter = activeAccount.title[0];
      this.currency = activeAccount.currency;
      localStorage.setItem("currency", activeAccount.currency);
      this.$store.commit("costs/setCosts", data.costs.costs);
      this.$store.commit("costs/setGroups", data.costs.groups);
      this.$store.commit("user/setBudget", data.budgets);
      this.$store.commit("user/setBalance", activeAccount.balance);
      this.$store.commit("incomes/setIncomes", data.incomes.incomes);
      this.$store.commit("incomes/setSources", data.incomes.sources);
      this.$store.commit("accounts/setAccounts", data.accounts);
      this.balance = activeAccount.balance;
    },
    closeFirstTime() {
      this.onBoarding.firstTime = false;
      localStorage.setItem("onBFirstTimeBudgets", true);
    },
    async onMount() {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");

      const month = this.$store.getters["user/month"];
      const { budgets, accounts, costs, incomes } = await getFinData(
        token,
        month,
        accountId
      );
      const activeAccount = getActiveAccount(accounts);
      this.accLatter = activeAccount.title[0];
      this.currency = activeAccount.currency;
      localStorage.setItem("currency", activeAccount.currency);
      // TODO In development
      // this.isTransferPossible = budgets.length > 1;
      this.budgets = budgets;
      this.balance = activeAccount.balance;
      this.costs = costs.costs;
      this.incomes = incomes.incomes;
    },
    checkOnboarding() {
      if (!localStorage.getItem("onBFirstTimeBudgets")) {
        this.onBoarding.firstTime = true;
      }
    },
  },
  async mounted() {
    this.checkOnboarding();
    await this.onMount();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
