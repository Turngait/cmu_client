<template>
  <div class="budgetsManagement">
    <button
      v-if="isTransferPossible"
      class="budgetsManagement__openTransferBtn"
      @click="onClickTransfer"
    >
      {{ $t('budgets.transferBetweenBudgets') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "budgets-management",
  props: ['onClickTransfer', 'isTransferPossible'],
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

  .budgetsManagement {
    display: flex;
    justify-content: flex-end;
    &__openTransferBtn {
      background: none;
      border: none;
      text-decoration: underline;
      font-size: 1.8rem;
      cursor: pointer;
      color: $black;
    }
  }
</style>
