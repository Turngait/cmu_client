<template>
  <Overlay v-slot="slotProps">
    <Preloader v-if="isLoading" />
    <div class="dashboard" v-else>
      <FirstTimeOnboarding
        :onClose="closeFirstTime"
        v-if="onBoarding.firstTime"
      />
      <TopMenu
        :logOut="slotProps.logOut"
        :balance="balance"
        :pageName="$t('common.dashboard')"
        :period="period"
        :changePeriod="changePeriod"
        :accLatter="accLatter"
      />
      <div class="dashboard__container">
        <div
          class="dashboard__container__graphsBox"
          v-if="costGraphShow || incomesGraphShow"
        >
          <p
            class="dashboard__info"
            v-if="
              (costsGarphData && !costsGarphData.days) ||
              costsGarphData.days.length < 2
            "
          >
            {{ $t("common.notEnoughData") }}
          </p>
          <div
            class="dashboard__info__canvasBox Hide500px"
            v-if="costChartOptions"
          >
            <PopChart
              chartId="costChart"
              :options="costChartOptions"
              :title="$t('common.costs')"
              :amount="spendInMonth"
            ></PopChart>
          </div>
          <div
            class="dashboard__info__canvasBox Hide500px"
            v-if="incomeChartOptions && incomesGraphShow"
          >
            <PopChart
              chartId="incomeChart"
              :options="incomeChartOptions"
              :title="$t('common.incomes')"
              :amount="gainByPeriod"
            />
          </div>
          <div class="dashboard__container__graphsBox__donChartsFlex">
            <div
              class="dashboard__container__graphsBox__donChartBox"
              v-if="groupsChartOptions"
            >
              <DonChart
                chartId="donPopChartGroups"
                :options="groupsChartOptions"
              />
            </div>
            <div
              class="dashboard__container__graphsBox__donChartBox"
              v-if="sourcesChartOptions && incomesGraphShow"
            >
              <DonChart
                chartId="donPopChartSources"
                :options="sourcesChartOptions"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="dashboard__container__infoText">
            {{ $t("dashboard.notEnoughData") }}
          </p>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../../components/partials/Overlay.vue";
import TopMenu from "../../components/partials/TopMenu.vue";
import Preloader from "../../components/partials/Preloader.vue";
import FirstTimeOnboarding from "../../components/onboarding/FirstTime.vue";
import PopChart from "./Components/PopChart.vue";
import DonChart from "./Components/DonChart.vue";

import { getFinData } from "./services";
import { getActiveAccount, calculateGroupSum } from "../../utils/index";

export default {
  name: "dashboard-main",
  components: {
    Overlay,
    TopMenu,
    Preloader,
    FirstTimeOnboarding,
    PopChart,
    DonChart,
  },
  props: ["logOut"],
  data() {
    return {
      isLoading: false,
      balance: 0,
      period: this.$store.state.user.month,
      costsGarphData: null,
      incomesGarphData: null,
      costGraphShow: false,
      incomesGraphShow: false,
      accLatter: "",
      onBoarding: {
        firstTime: false,
      },
      costChartOptions: null,
      incomeChartOptions: null,
      sourcesChartOptions: null,
      groupsChartOptions: null,
      graphData: null,
      spendInMonth: 0,
      gainByPeriod: 0,
    };
  },
  methods: {
    closeFirstTime() {
      this.onBoarding.firstTime = false;
      localStorage.setItem("onBFirstTime", true);
    },
    setFinDate(data) {
      const { groups } = calculateGroupSum(data.costs);
      const { sources } = calculateGroupSum(data.incomes, "incomes");
      const activeAccount = getActiveAccount(data.accounts);
      this.accLatter = activeAccount.title[0];
      localStorage.setItem("currency", activeAccount.currency);

      this.$store.commit("costs/setCosts", data.costs.costs);
      this.$store.commit("costs/setGroups", groups);
      this.$store.commit("user/setBudget", data.budgets.items);
      this.$store.commit("user/setBalance", activeAccount.balance);
      this.$store.commit("incomes/setIncomes", data.incomes.incomes);
      this.$store.commit("incomes/setSources", sources);
      this.$store.commit("accounts/setAccounts", data.accounts);

      this.balance = activeAccount.balance;
      this.costsGarphData = data.costs.graphData;
      this.incomesGarphData = data.incomes.incomeGraphData;
      this.spendInMonth =
        data.costs.costs[data.costs.costs.length - 1]?.spentByThisMonth | 0;
      this.gainByPeriod =
        data.incomes.incomes[data.incomes.incomes.length - 1]?.gainByPeriod | 0;

      return {
        costsGarphData: data.costs.graphData,
        incomesGarphData: data.incomes.incomeGraphData,
        groups,
        sources,
      };
    },
    async onMounted() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const data = await getFinData(token, this.period, accountId);
      if (data) {
        this.isLoading = false;

        data.incomes.incomeGraphData &&
        data.incomes.incomeGraphData.days.length > 2
          ? (this.incomesGraphShow = true)
          : (this.incomesGraphShow = false);
        data.costs.graphData && data.costs.graphData.days.length > 2
          ? (this.costGraphShow = true)
          : (this.costGraphShow = false);

        return this.setFinDate(data);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("accountId");
        this.$router.push("/");
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
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("accountId");
        this.$router.push("/");
      }
    },
    toggleOnboarding() {
      if (!localStorage.getItem("onBFirstTime"))
        this.onBoarding.firstTime = true;
    },
    setGraphOptions(costsGarphData, incomesGarphData, groups, sources) {
      if (
        costsGarphData &&
        costsGarphData.days &&
        costsGarphData.days.length > 2
      ) {
        const costsOptions = {
          color: "#00A6CB",
          label: this.$t("common.costs"),
          canvasId: "costChart",
          data: costsGarphData,
        };

        const incomesOptions = {
          color: "#2EC62A",
          label: this.$t("common.incomes"),
          canvasId: "incomeChart",
          data: incomesGarphData,
        };

        const groupsOptions = {
          data: groups,
          canvasId: "donPopChartGroups",
          text: this.$t("common.costsByGroups"),
          label: "Группа расходов",
        };

        const sourcesOptions = {
          data: sources,
          canvasId: "donPopChartSources",
          text: this.$t("common.incomesBySources"),
          label: "Группа расходов",
        };
        this.graphData = [incomesOptions, costsOptions];
        this.costChartOptions = costsOptions;
        this.incomeChartOptions = incomesOptions;
        this.groupsChartOptions = groupsOptions;
        this.sourcesChartOptions = sourcesOptions;
      }
    },
  },
  async mounted() {
    this.toggleOnboarding();

    const { costsGarphData, incomesGarphData, groups, sources } =
      await this.onMounted();
    // TODO move this to another component
    this.setGraphOptions(costsGarphData, incomesGarphData, groups, sources);
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
