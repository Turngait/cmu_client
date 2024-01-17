<script setup>
  import { ref, defineProps } from 'vue';

  import PopUp from "../../../components/partials/PopUp.vue";

  import { numberFormat, formateDate } from "../../../utils";

  const props = defineProps(["onClose", "filteredIncomes"]);

  const currency = ref(localStorage.getItem("currency"));

  function formatNumber(amount) {
    return numberFormat(amount);
  }

  function dateFormat(date) {
    return formateDate(date);
  }
</script>

<template>
  <PopUp :header="$t('incomes.filteredIncomesTitle')" :onClose="props.onClose">
    <div
      class="filteredIncomesBox"
      v-for="income of props.filteredIncomes"
      :key="income.id"
    >
      <div class="filteredIncomesBox__mainInfoBox">
        <p class="filteredIncomesBox__mainInfoBox__date">
          {{ dateFormat(income.date) }}
        </p>
        <p class="filteredIncomesBox__mainInfoBox__title">
          {{ income.title }}
        </p>
        <p class="filteredIncomesBox__mainInfoBox__amount">
          {{ formatNumber(income.amount) + " " + currency }}
        </p>
      </div>
    </div>
  </PopUp>
</template>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.filteredIncomesBox {
  &__mainInfoBox {
    display: flex;
    gap: 1rem;
    font-size: 1.4rem;
  }
}
</style>
