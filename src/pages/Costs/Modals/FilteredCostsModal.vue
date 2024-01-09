<script setup>
  import { ref, onMounted, defineProps } from 'vue';

  import PopUp from "../../../components/partials/PopUp.vue";

  import { numberFormat, formateDate } from "../../../utils";

  const props = defineProps(["onClose", "filteredCosts"]);

  const currency = ref(localStorage.getItem("currency"));
  const total = ref(0);

  function formatNumber(amount) {
    return numberFormat(amount);
  }

  function dateFormat(date) {
    return formateDate(date);
  }

  onMounted(() => {
    total.value = props.filteredCosts.reduce((acc, item) => acc + item.amount, 0);
  });
</script>

<template>
  <PopUp
    :header="$t('costs.filteredCostTitle')"
    :onClose="props.onClose"
  >
    <div class="modal__headerBox__total">
      {{ `${$t("costs.total")}: ${total} ${currency}` }}
    </div>
    <div class="filteredCostsContainer">
      <div
        class="filteredCostsBox"
        v-for="cost of props.filteredCosts"
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
