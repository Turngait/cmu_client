<template>
  <Preloader v-if="isLoading" />
  <div class="accounts" v-else>
    <FirstTimeAccounts v-if="onBoarding.firstTime" :onClose="closeFirstTime" />
    <AddAccountModal
      :onClose="toggleIsAddAccOpen"
      :currencies="currencies"
      :addAccount="addAccount"
      v-if="isAddAccOpen"
    />
    <EditAccountModal
      v-if="editableAccount"
      :item="editableAccount"
      :currencies="currencies"
      :onClose="closeEditAcc"
      :onEdit="editAccount"
    />
    <TopMenu
      :logOut="logOut"
      :balance="balance"
      :pageName="$t('accounts.accounts')"
      :period="period"
      :changePeriod="changePeriod"
      :accLatter="accLatter"
    />
    <div class="accounts__container">
      <h3 class="accounts__container__heading">
        {{ $t("accounts.accounts") }}
      </h3>
      <p class="modal_msg">{{ msg }}</p>
      <div class="accounts__accountsBox">
        <AccountItem
          v-for="item of accounts"
          :key="item.id"
          :item="item"
          :onDelete="deleteAccount"
          :isLast="accounts.length <= 1"
          :onEdit="editAccOpen"
          :onSwitch="switchAccount"
          :active="activeAccountId === item.id"
        />
      </div>
      <AddBigBtn :onClick="toggleIsAddAccOpen" />
    </div>
  </div>
</template>

<script>
import TopMenu from "../../components/partials/TopMenu.vue";
import Preloader from "../../components/partials/Preloader.vue";

import {
  getFinData,
  addAccountToAPI,
  deleteAccountFromAPI,
  editAccountAtAPI,
} from "./services";
import { getActiveAccount, calculateGroupSum } from "../../utils/index";
import AddBigBtn from "../../components/controls/AddBigBtn.vue";
import AddAccountModal from "./Modals/AddAccountModal.vue";
import AccountItem from "./Components/AccountItem.vue";
import EditAccountModal from "./Modals/EditAccountModal.vue";
import FirstTimeAccounts from "../../components/onboarding/FirstTimeAccounts.vue";

import currencies from "../../assets/currency-symbols.json";

export default {
  name: "accounts-main",
  components: {
    TopMenu,
    Preloader,
    AddBigBtn,
    AddAccountModal,
    AccountItem,
    EditAccountModal,
    FirstTimeAccounts,
  },
  data() {
    return {
      isLoading: false,
      balance: 0,
      period: this.$store.state.user.month,
      accLatter: "",
      accounts: [],
      isAddAccOpen: false,
      msg: "",
      currencies,
      editableAccount: null,
      activeAccountId: 0,
      onBoarding: {
        firstTime: false,
      },
    };
  },
  methods: {
    async addAccount(newAccount) {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const result = await addAccountToAPI(
        newAccount,
        token,
        (msg) => (this.msg = msg)
      );
      if (result === 202) {
        this.toggleIsAddAccOpen();
        await this.onMounted();
        this.$toast(this.$t("notifications.accountOnAdd"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async deleteAccount(accountId) {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const result = await deleteAccountFromAPI(
        accountId,
        token,
        (msg) => (this.msg = msg)
      );
      if (result === 200) {
        await this.onMounted();
        this.$toast(this.$t("notifications.accountOnDelete"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    editAccOpen(id) {
      this.editableAccount = this.accounts.filter((item) => item.id === id)[0];
    },
    closeEditAcc() {
      this.editableAccount = null;
    },
    async editAccount(account) {
      this.isLoading = true;
      const token = localStorage.getItem("token");

      const result = await editAccountAtAPI(
        account,
        token,
        (msg) => (this.msg = msg)
      );
      if (result === 200) {
        this.closeEditAcc();
        await this.onMounted();
        this.$toast(this.$t("notifications.accountOnEdit"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    switchAccount(id) {
      localStorage.setItem("accountId", id);
      this.$router.push({ path: "/dashboard" });
    },
    toggleIsAddAccOpen() {
      this.isAddAccOpen = !this.isAddAccOpen;
    },
    // TODO Make a wrapper and put all this function in the wrapper
    switchLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("accountId");
      this.$store.commit("user/resetState");
      this.$store.commit("costs/resetState");
      this.$store.commit("incomes/resetState");
      this.$router.push("/");
    },
    setFinDate(data) {
      // TODO Optimize code
      // console.log(data);
      const { groups } = calculateGroupSum(data.costs);
      const { sources } = calculateGroupSum(data.incomes, "incomes");
      const activeAccount = getActiveAccount(data.accounts);
      this.activeAccountId = activeAccount.id;
      this.accLatter = activeAccount.title[0];
      localStorage.setItem("currency", activeAccount.currency);
      this.$store.commit("costs/setCosts", data.costs.costs);
      this.$store.commit("costs/setGroups", groups);
      this.$store.commit("user/setBudget", data.budgets.items);
      this.$store.commit("user/setBalance", activeAccount.balance);
      this.$store.commit("incomes/setIncomes", data.incomes.incomes);
      this.$store.commit("incomes/setSources", sources);
      this.$store.commit("accounts/setAccounts", data.accounts);
      this.accounts = data.accounts;
      this.balance = activeAccount.balance;
    },
    async onMounted() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      if (!token) this.$router.push("/");
      else {
        const data = await getFinData(token, this.period, accountId);
        if (data) {
          this.isLoading = false;
          this.setFinDate(data);
        }
      }
      this.isLoading = false;
      return null;
    },
    async changePeriod(newPeriod) {
      const token = localStorage.getItem("token");
      const data = await getFinData(token, newPeriod);
      if (data) {
        this.setFinDate(data);
        this.period = newPeriod;
        this.$store.commit("user/setMonth", newPeriod);
      }
    },
    closeFirstTime() {
      this.onBoarding.firstTime = false;
      localStorage.setItem("onBFirstTimeAccounts", true);
    },
    checkOnboarding() {
      if (!localStorage.getItem("onBFirstTimeAccounts")) {
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
