<script setup>
  import { defineProps } from 'vue';
  const props = defineProps(['onClickTransfer', 'isTransferPossible']);
</script>

<template>
  <div class="budgetsManagement">
    <button
      v-if="props.isTransferPossible"
      class="budgetsManagement__openTransferBtn"
      @click="props.onClickTransfer"
    >
      {{ $t('budgets.transferBetweenBudgets') }}
    </button>
  </div>
</template>

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
