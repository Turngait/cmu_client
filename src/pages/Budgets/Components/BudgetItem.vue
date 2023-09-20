<template>
  <div class="budget">
    <div class="budget__headerBox">
      <h3 class="budget__headerBox__title" @click="openHistory(item.id)">
        {{ item.title }}
      </h3>
      <div class="budget__headerBox__iconBox">
        <EditBtnIcon :onClick="onEdit" />
        <DeleteBtnIcon v-if="!isLast" :onClick="onDelete" />
      </div>
    </div>
    <div class="budget__amount">{{ item.balance }} {{ currency }}</div>
    <div class="budget__date">
      {{ $t("budgets.createdAt") }}: {{ showDate() }}
    </div>
  </div>
</template>

<script>
import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
import EditBtnIcon from "../../../components/icons/EditBtn.vue";

import { formateDate } from "../../../utils";

export default {
  name: "budget-item",
  props: [
    "item",
    "deleteBudget",
    "editBudget",
    "isLast",
    "currency",
    "openHistory",
  ],
  components: {
    DeleteBtnIcon,
    EditBtnIcon,
  },
  methods: {
    onDelete() {
      this.deleteBudget(this.item.id);
    },
    onEdit() {
      this.editBudget(this.item.id);
    },
    showDate() {
      return formateDate(this.item.created_at);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./BudgetItem.scss";
</style>
