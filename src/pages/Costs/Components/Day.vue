<template>
  <div class="day">
    <div class="day__info">
      <div>{{ period }}</div>
      <div>
        {{ `${$t("common.today")}: ${spentByDay}  ${currency}` }}
      </div>
      <div v-if="dailyTarget">
        {{ `${$t("costs.dailyTarget")}: ${dailyTarget} ${currency}` }}
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

<script>
import CostItem from "./CostItem.vue";

import { numberFormat, formateDate } from "../../../utils";

export default {
  name: "CostDay",
  components: {
    CostItem,
  },
  props: [
    "data",
    "deleteCost",
    "filterCostsByGroup",
    "filteredCostsByBudget",
    "targets",
  ],
  data() {
    return {
      period:
        this.data && this.data.period
          ? formateDate(this.data.period)
          : formateDate(new Date().toISOString().slice(0, 10)),
      spentByDay:
        this.data && this.data.spentByDay
          ? numberFormat(this.data.spentByDay)
          : 0,
      currency: "USD",
      dailyTarget: 0,
      isTargetExceeded: false,
    };
  },
  mounted() {
    if(this.targets && this.targets.day && this.targets.day.length) {
      this.dailyTarget = this.targets.day[0].amount;
      this.isTargetExceeded = this.data
        ? this.data.spentByDay > this.dailyTarget
        : false;
    }

    this.currency = localStorage.getItem("currency");
  },
  updated() {
    // TODO Improve this code
    let costPerDay = 0;
    for (const item of this.data.items) {
      costPerDay += item.amount;
    }
    this.spentByDay = costPerDay;
    if(this.targets && this.targets.day && this.targets.day.length) {
      this.dailyTarget = this.targets.day[0].amount;
    }
  },
};
</script>

<style scoped lang="scss">
@import "./Day.scss";
</style>
