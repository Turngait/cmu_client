<script setup>
  import { ref, onMounted, defineProps, computed } from 'vue';
  import { useStore } from 'vuex';

  import PopUp from "../../../components/partials/PopUp.vue";

  const store = useStore();
  const props = defineProps(["onClose", "items", "currency", "balance"]);

  const period = ref(computed(() => store.state.user.month));
  const spent = ref(0);
  const gain = ref(0);

  onMounted(() => {
    spent.value = props.items.costs.reduce(
      (acc, item) => (acc += item.amount),
      0
    );
    gain.value = props.items.incomes.reduce(
      (acc, item) => (acc += item.amount),
      0
    );
  });

</script>

<template>
  <PopUp :header="$t('budgets.history')" :onClose="props.onClose">
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
        {{ $t("accounts.balance") }}: {{ props.balance }} {{ props.currency }}
      </div>
      <div class="historyBoxInfo__item">
        {{ $t("budgets.spent") }}: {{ spent }} {{ props.currency }}
      </div>
      <div class="historyBoxInfo__item">
        {{ $t("budgets.gain") }}: {{ gain }} {{ props.currency }}
      </div>
    </div>
    <div class="historyBox">
      <div class="historyBox__itemsBox">
        <div class="historyBox__itemsBox__heading">
          {{ $t("common.costs") }}
        </div>
        <div v-if="props.items.costs.length">
          <div
            class="historyBox__itemsBox__amountBox"
            v-for="item of props.items.costs"
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
            {{ item.amount }} {{ props.currency }}
            <div v-for="cost of item.items" :key="cost.id">
              <span class="historyBox__itemsBox__amountBox__title">{{
                cost.title
              }}</span>
              {{ cost.amount }} {{ props.currency }}
            </div>
          </div>
        </div>
        <div v-else>{{ $t("budgets.noHistoryCosts") }}</div>
      </div>

      <div class="historyBox__itemsBox">
        <div class="historyBox__itemsBox__heading">
          {{ $t("common.incomes") }}
        </div>
        <div v-if="props.items.incomes.length">
          <div
            class="historyBox__itemsBox__amountBox"
            v-for="item of props.items.incomes"
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
            {{ item.amount }} {{ props.currency }}
            <div v-for="income of item.items" :key="income.id">
              <span class="historyBox__itemsBox__amountBox__title">{{
                income.title
              }}</span>
              {{ income.amount }} {{ props.currency }}
            </div>
          </div>
        </div>
        <div v-else>{{ $t("budgets.noHistoryIncomes") }}</div>
      </div>
    </div>
  </PopUp>
</template>

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
