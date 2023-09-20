<template>
  <PopUp :header="$t('incomes.filteredIncomesTitle')" :onClose="onClose">
    <div
      class="filteredIncomesBox"
      v-for="income of filteredIncomes"
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

<script>
import PopUp from "../../../components/partials/PopUp.vue";

import { numberFormat, formateDate } from "../../../utils";

export default {
  name: "FilteredIncomesModal",
  components: { PopUp },
  props: ["onClose", "filteredIncomes"],
  data() {
    return {
      currency: localStorage.getItem("currency"),
    };
  },
  methods: {
    formatNumber(amount) {
      return numberFormat(amount);
    },
    dateFormat(date) {
      return formateDate(date);
    },
  },
};
</script>

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
