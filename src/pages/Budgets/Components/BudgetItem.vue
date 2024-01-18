<script setup>
  import { defineProps } from 'vue';
  import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
  import EditBtnIcon from "../../../components/icons/EditBtn.vue";

  import { formateDate } from "../../../utils";

  const props = defineProps([
    "item",
    "deleteBudget",
    "editBudget",
    "isLast",
    "currency",
    "openHistory",
  ]);

  function onDelete() {
    props.deleteBudget(props.item.id);
  }
  function onEdit() {
    props.editBudget(props.item.id);
  }
  function showDate() {
    return formateDate(props.item.created_at);
  }

</script>

<template>
  <div class="budget">
    <div class="budget__headerBox">
      <h3 class="budget__headerBox__title" @click="props.openHistory(props.item.id)">
        {{ props.item.title }}
      </h3>
      <div class="budget__headerBox__iconBox">
        <EditBtnIcon :onClick="onEdit" />
        <DeleteBtnIcon v-if="!props.isLast" :onClick="onDelete" />
      </div>
    </div>
    <div class="budget__amount">{{ props.item.balance }} {{ props.currency }}</div>
    <div class="budget__date">
      {{ $t("budgets.createdAt") }}: {{ showDate() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./BudgetItem.scss";
</style>
