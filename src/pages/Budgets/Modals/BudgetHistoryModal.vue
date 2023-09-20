<template>
  <PopUp :header="$t('budgets.history')" :onClose="onClose">
    <div class="historyBoxInfo">
      <div class="historyBoxInfo__item">
        {{
          new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
          }).format(new Date(period))
        }}
      </div>
      <div class="historyBoxInfo__item">
        {{ $t("accounts.balance") }}: {{ balance }} {{ currency }}
      </div>
      <div class="historyBoxInfo__item">
        {{ $t("budgets.spent") }}: {{ spent }} {{ currency }}
      </div>
      <div class="historyBoxInfo__item">
        {{ $t("budgets.gain") }}: {{ gain }} {{ currency }}
      </div>
    </div>
    <div class="historyBox">
      <div class="historyBox__itemsBox">
        <div class="historyBox__itemsBox__heading">
          {{ $t("common.costs") }}
        </div>
        <div v-if="items.costs.length">
          <div
            class="historyBox__itemsBox__amountBox"
            v-for="item of items.costs"
            :key="item.date"
          >
            <span class="historyBox__itemsBox__amountBox__title"
              ><b>{{
                new Intl.DateTimeFormat("ru-Ru", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }).format(new Date(item.date))
              }}</b></span
            >
            {{ item.amount }} {{ currency }}
            <div v-for="cost of item.items" :key="cost.id">
              <span class="historyBox__itemsBox__amountBox__title">{{
                cost.title
              }}</span>
              {{ cost.amount }} {{ currency }}
            </div>
          </div>
        </div>
        <div v-else>{{ $t("budgets.noHistoryCosts") }}</div>
      </div>

      <div class="historyBox__itemsBox">
        <div class="historyBox__itemsBox__heading">
          {{ $t("common.incomes") }}
        </div>
        <div v-if="items.incomes.length">
          <div
            class="historyBox__itemsBox__amountBox"
            v-for="item of items.incomes"
            :key="item.date"
          >
            <span class="historyBox__itemsBox__amountBox__title"
              ><b>{{
                new Intl.DateTimeFormat("ru-Ru", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }).format(new Date(item.date))
              }}</b></span
            >
            {{ item.amount }} {{ currency }}
            <div v-for="income of item.items" :key="income.id">
              <span class="historyBox__itemsBox__amountBox__title">{{
                income.title
              }}</span>
              {{ income.amount }} {{ currency }}
            </div>
          </div>
        </div>
        <div v-else>{{ $t("budgets.noHistoryIncomes") }}</div>
      </div>
    </div>
  </PopUp>
</template>

<script>
import PopUp from "../../../components/partials/PopUp.vue";

export default {
  name: "BudgetHistoryModal",
  components: {
    PopUp,
  },
  data() {
    return {
      period: this.$store.state.user.month,
      spent: 0,
      gain: 0,
    };
  },
  props: ["onClose", "items", "currency", "balance"],
  mounted() {
    this.spent = this.items.costs.reduce(
      (acc, item) => (acc += item.amount),
      0
    );
    this.gain = this.items.incomes.reduce(
      (acc, item) => (acc += item.amount),
      0
    );
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.historyBox {
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  font-size: 1.4rem;

  &__itemsBox {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__heading {
      font-size: 1.6rem;
      font-weight: 800;
    }

    &__amountBox {
      &__title {
        display: inline-block;
        width: 10rem;
      }
    }
  }
}

.historyBoxInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  &__item {
    font-size: 1.6rem;
  }
}
</style>
