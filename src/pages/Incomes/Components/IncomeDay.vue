<script setup>
  import { ref, onUpdated, defineProps } from 'vue';

  import IncomeItem from "./IncomeItem.vue";

  import { numberFormat, formateDate } from "../../../utils";

  const props = defineProps([
    "data",
    "deleteIncome",
    "filterIncomesByGroup",
    "filteredIncomesByBudget",
  ]);

  const period = ref(props.data && props.data.period
    ? formateDate(props.data.period)
    : formateDate(new Date().toISOString().slice(0, 10)));
  const gainByDay = ref(props.data && props.data.gainByDay
    ? numberFormat(props.data.gainByDay)
    : 0);
  const currency = ref(localStorage.getItem("currency"));

  onUpdated(() => {
    // TODO Think how to improve this code
    let incomePerDay = 0;
    for (const item of props.data.items) {
      incomePerDay += item.amount;
    }
    gainByDay.value = incomePerDay;
  });

</script>

<template>
  <div class="day">
    <div class="day__info">
      <div>{{ period }}</div>
      <div>{{ $t("common.today") + ": " + gainByDay }}</div>
    </div>
    <div class="day__cardsBox">
      <IncomeItem
        v-for="income in props.data.items"
        :key="income._id"
        :income="income"
        :deleteIncome="props.deleteIncome"
        :currency="currency"
        :filterIncomesByGroup="props.filterIncomesByGroup"
        :filteredIncomesByBudget="props.filteredIncomesByBudget"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./Day.scss";
</style>
