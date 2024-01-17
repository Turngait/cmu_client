<script setup>
  import { ref, onMounted, defineProps, computed } from 'vue';
  import { useStore } from 'vuex';

  import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
  import { showGroupName, showBudgetName } from "../../../utils/index";

  const store = useStore();

  const props = defineProps([
    "income",
    "deleteIncome",
    "currency",
    "filterIncomesByGroup",
    "filteredIncomesByBudget",
  ]);

  const isDescrOpen = ref(false);
  const sourceName = ref('');
  const budgetName = ref('');

  async function onDelete() {
    await props.deleteIncome(props.income.id);
  }
  function toggleDescr() {
    isDescrOpen.value = !isDescrOpen.value;
  }

  onMounted(() => {
    const sources = computed(() => store.state.incomes.sources);
    const budgets = computed(() => store.state.user.budgets);
    sourceName.value = showGroupName(+props.income.source_id, sources.value);
    budgetName.value = showBudgetName(+props.income.budget_id, budgets.value);
  });

</script>

<template>
  <div class="income">
    <template v-if="isDescrOpen">
      <div class="income__info">
        <u>{{ $t("common.description") }}:</u><br />{{ props.income.description }}
      </div>
      <div @click="toggleDescr" class="income__showMore">
        {{ $t("common.closeDescr") }}
      </div>
    </template>
    <template v-else>
      <div class="income__headerBox">
        <h3 class="income__headerBox__title">{{ props.income.title }}</h3>
        <div class="income__headerBox__iconBox">
          <!-- <EditBtnIcon /> -->
          <DeleteBtnIcon :onClick="onDelete" />
        </div>
      </div>
      <div class="income__amount">{{ props.income.amount + " " + props.currency }}</div>
      <div
        class="income__info income__source"
        @click="props.filterIncomesByGroup(props.income.source_id)"
      >
        {{ $t("incomes.source") }}: {{ sourceName }}
      </div>
      <div
        class="income__info income__budget"
        @click="props.filteredIncomesByBudget(props.income.budget_id)"
      >
        {{ $t("costs.budget") }}: {{ budgetName }}
      </div>
      <div
        v-if="props.income.description"
        @click="toggleDescr"
        class="income__showMore"
      >
        {{ $t("common.moreInfo") }}
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import "./incomeItem.scss";
</style>
