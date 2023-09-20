<template>
  <div class="day">
    <div class="day__info">
      <div>{{ period }}</div>
      <div>{{ $t("common.today") + ": " + gainByDay }}</div>
    </div>
    <div class="day__cardsBox">
      <IncomeItem
        v-for="income in data.items"
        :key="income._id"
        :income="income"
        :deleteIncome="deleteIncome"
        :currency="currency"
        :filterIncomesByGroup="filterIncomesByGroup"
        :filteredIncomesByBudget="filteredIncomesByBudget"
      />
    </div>
  </div>
</template>

<script>
import IncomeItem from "./IncomeItem.vue";

import { numberFormat, formateDate } from "../../../utils";

export default {
  name: "IncomeDay",
  props: [
    "data",
    "deleteIncome",
    "filterIncomesByGroup",
    "filteredIncomesByBudget",
  ],
  data() {
    return {
      period:
        this.data && this.data.period
          ? formateDate(this.data.period)
          : formateDate(new Date().toISOString().slice(0, 10)),
      gainByDay:
        this.data && this.data.gainByDay
          ? numberFormat(this.data.gainByDay)
          : 0,
      currency: "руб",
    };
  },
  components: {
    IncomeItem,
  },
  mounted() {
    this.currency = localStorage.getItem("currency");
  },
  updated() {
    // TODO Think how to improve this code
    let incomePerDay = 0;
    for (const item of this.data.items) {
      incomePerDay += item.amount;
    }
    this.gainByDay = incomePerDay;
  },
};
</script>

<style scoped lang="scss">
@import "./Day.scss";
</style>
