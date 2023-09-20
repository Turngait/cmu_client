<template>
  <div class="income">
    <template v-if="isDescrOpen">
      <div class="income__info">
        <u>{{ $t("common.description") }}:</u><br />{{ income.description }}
      </div>
      <div @click="toggleDescr" class="income__showMore">
        {{ $t("common.closeDescr") }}
      </div>
    </template>
    <template v-else>
      <div class="income__headerBox">
        <h3 class="income__headerBox__title">{{ income.title }}</h3>
        <div class="income__headerBox__iconBox">
          <!-- <EditBtnIcon /> -->
          <DeleteBtnIcon :onClick="onDelete" />
        </div>
      </div>
      <div class="income__amount">{{ income.amount + " " + currency }}</div>
      <div
        class="income__info income__source"
        @click="filterIncomesByGroup(income.source_id)"
      >
        {{ $t("incomes.source") }}: {{ sourceName }}
      </div>
      <div
        class="income__info income__budget"
        @click="filteredIncomesByBudget(income.budget_id)"
      >
        {{ $t("costs.budget") }}: {{ budgetName }}
      </div>
      <div
        v-if="income.description"
        @click="toggleDescr"
        class="income__showMore"
      >
        {{ $t("common.moreInfo") }}
      </div>
    </template>
  </div>
</template>

<script>
import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
// import EditBtnIcon from "../../components/icons/EditBtn.vue";
import { showGroupName, showBudgetName } from "../../../utils/index";

export default {
  name: "IncomeItem",
  props: [
    "income",
    "deleteIncome",
    "currency",
    "filterIncomesByGroup",
    "filteredIncomesByBudget",
  ],
  data() {
    return {
      isDescrOpen: false,
      sourceName: "",
      budgetName: "",
    };
  },
  components: {
    DeleteBtnIcon,
  },
  methods: {
    async onDelete() {
      await this.deleteIncome(this.income.id);
    },
    toggleDescr() {
      this.isDescrOpen = !this.isDescrOpen;
    },
  },
  mounted() {
    const sources = this.$store.state.incomes.sources;
    const budgets = this.$store.state.user.budgets;
    this.sourceName = showGroupName(+this.income.source_id, sources);
    this.budgetName = showBudgetName(+this.income.budget_id, budgets);
  },
};
</script>

<style scoped lang="scss">
@import "./incomeItem.scss";
</style>
