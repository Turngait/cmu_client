<template>
  <PopUp
    :header="$t('costs.filteredCostTitle')"
    :onClose="onClose"
    :className="'modalStat'"
  >
    <div class="modal__headerBox__total">
      {{ `${$t("costs.total")}: ${total} ${currency}` }}
    </div>
    <div class="filteredCostsContainer">
      <div
        class="filteredCostsBox"
        v-for="cost of filteredCosts"
        :key="cost.id"
      >
        <div class="filteredCostsBox__mainInfoBox">
          <p class="filteredCostsBox__mainInfoBox__date">
            {{ dateFormat(cost.date) }}
          </p>
          <p class="filteredCostsBox__mainInfoBox__title">{{ cost.title }}</p>
          <p class="filteredCostsBox__mainInfoBox__amount">
            {{ formatNumber(cost.amount) + " " + currency }}
          </p>
        </div>
      </div>
    </div>
  </PopUp>
</template>

<script>
import PopUp from "../../../components/partials/PopUp.vue";

import { numberFormat, formateDate } from "../../../utils";

export default {
  name: "FilteredCostsModal",
  components: { PopUp },
  props: ["onClose", "filteredCosts"],
  data() {
    return {
      currency: localStorage.getItem("currency"),
      total: 0,
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
  mounted() {
    this.total = this.filteredCosts.reduce((acc, item) => acc + item.amount, 0);
  },
};
</script>

<style lang="scss">
@import "/src/styles/main.scss";

.modalStat {
  width: 52rem;
}
.modal {
  &__headerBox {
    &__total {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}

.filteredCostsContainer {
  max-height: 30rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filteredCostsBox {
  &__mainInfoBox {
    display: flex;
    gap: 1rem;
    font-size: 1.4rem;
  }
}
</style>
