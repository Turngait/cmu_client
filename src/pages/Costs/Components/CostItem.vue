<template>
  <div class="cost">
    <template v-if="isDescrOpen">
      <div class="cost__info">
        <u>{{ $t("common.description") }}:</u><br />{{ cost.description }}
      </div>
      <div @click="openDescr" class="cost__showMore">
        {{ $t("common.closeDescr") }}
      </div>
    </template>
    <template v-else>
      <div class="cost__headerBox">
        <h3 class="cost__headerBox__title">{{ cost.title }}</h3>
        <div class="cost__headerBox__iconBox">
          <DeleteBtnIcon :onClick="onDelete" />
        </div>
      </div>
      <div class="cost__amount">{{ cost.amount + " " + currency }}</div>
      <div
        class="cost__info cost__groupTitle"
        @click="filterCostsByGroup(cost.group_id)"
      >
        {{ $t("costs.group") }}: {{ groupName }}
      </div>
      <div
        class="cost__info cost__budgetTitle"
        @click="filteredCostsByBudget(cost.budget_id)"
      >
        {{ $t("costs.budget") }}: {{ budgetName }}
      </div>
      <div v-if="cost.description" @click="openDescr" class="cost__showMore">
        {{ $t("common.moreInfo") }}
      </div>
    </template>
  </div>
</template>

<script>
import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";

import { showGroupName, showBudgetName } from "../../../utils/index";

export default {
  name: "CostItem",
  data() {
    return {
      isDescrOpen: false,
      groupName: "",
      budgetName: "",
    };
  },
  components: {
    DeleteBtnIcon,
  },
  props: [
    "cost",
    "deleteCost",
    "currency",
    "filterCostsByGroup",
    "filteredCostsByBudget",
  ],
  methods: {
    onDelete() {
      this.deleteCost(this.cost.id);
    },
    openDescr() {
      this.isDescrOpen = !this.isDescrOpen;
    },
  },
  mounted() {
    const groups = this.$store.state.costs.groups;
    const budgets = this.$store.state.user.budgets;
    this.groupName = showGroupName(+this.cost.group_id, groups);
    this.budgetName = showBudgetName(+this.cost.budget_id, budgets);
  },
};
</script>

<style scoped lang="scss">
@import "./CostItem.scss";
</style>
