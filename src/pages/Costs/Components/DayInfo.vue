<script setup>
  import { ref, onMounted, defineProps, onUpdated } from 'vue';

  import CostItem from "./CostItem.vue";

  import { numberFormat, formateDate } from "../../../utils";
  const props = defineProps([
    "data",
    "deleteCost",
    "filterCostsByGroup",
    "filteredCostsByBudget",
    "targets",
  ]);

  const period = ref(props.data && props.data.period ? formateDate(props.data.period) : formateDate(new Date().toISOString().slice(0, 10)));
  const spentByDay = ref(props.data && props.data.spentByDay ? numberFormat(props.data.spentByDay) : 0);
  const currency = ref("USD");
  const dailyTarget = ref(0);
  const isTargetExceeded = ref(false);

  onMounted(() => {
    if(props.targets && props.targets.day && props.targets.day.length) {
      dailyTarget.value = props.targets.day[0].amount;
      isTargetExceeded.value = props.data
        ? props.data.spentByDay > dailyTarget.value
        : false;
    }

    currency.value = localStorage.getItem("currency");
  });

  onUpdated(() => {
    // TODO Improve this code
    let costPerDay = 0;
    for (const item of props.data.items) {
      costPerDay += item.amount;
    }
    spentByDay.value = costPerDay;
    if(props.targets && props.targets.day && props.targets.day.length) {
      dailyTarget.value = props.targets.day[0].amount;
    }
  });
</script>

<template>
  <div class="day">
    <div class="day__info">
      <div>{{ period }}</div>
      <div>
        {{ `${$t("common.today")}: ${spentByDay}  ${currency}` }}
      </div>
      <div v-if="dailyTarget">
        {{ `${$t("costs.dailyTarget")}: ${dailyTarget}` }}
        \ {{ dailyTarget && dailyTarget !== 0 ? ((spentByDay / dailyTarget) * 100).toFixed(2) : 0 }}%
      </div>
      <div v-if="isTargetExceeded">
        <div class="attention" :title="$t('costs.targetExceeded')">!</div>
      </div>
    </div>
    <div class="day__cardsBox">
      <CostItem
        v-for="cost in data.items"
        :key="cost._id"
        :cost="cost"
        :deleteCost="deleteCost"
        :currency="currency"
        :filterCostsByGroup="filterCostsByGroup"
        :filteredCostsByBudget="filteredCostsByBudget"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./Day.scss";
</style>
