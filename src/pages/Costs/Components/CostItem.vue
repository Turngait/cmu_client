<script setup>
  import { ref, onMounted, defineProps, computed } from 'vue';
  import { useStore } from 'vuex';

  import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";

  import { showGroupName, showBudgetName } from "../../../utils/index";

  const store = useStore();

  let isDescrOpen = ref(false);
  const groupName = ref("");
  const budgetName = ref("");
  const groups = computed(() => store.getters["costs/getCostsGroup"]);
  const budgets = computed(() => store.state.user.budgets);

  const props = defineProps(["cost",
      "deleteCost",
      "currency",
      "filterCostsByGroup",
      "filteredCostsByBudget"]);

  function onDelete() {
    props.deleteCost(props.cost.id);
  }

  function openDescr() {
    isDescrOpen = !isDescrOpen.value;
  }

  onMounted(() => {
    groupName.value = showGroupName(+props.cost.group_id, groups.value);
    budgetName.value = showBudgetName(+props.cost.budget_id, budgets.value);
  });
</script>

<template>
  <div class="cost">
    <template v-if="isDescrOpen">
      <div class="cost__info">
        <u>{{ $t("common.description") }}:</u><br />{{ props.cost.description }}
      </div>
      <div @click="openDescr" class="cost__showMore">
        {{ $t("common.closeDescr") }}
      </div>
    </template>
    <template v-else>
      <div class="cost__headerBox">
        <h3 class="cost__headerBox__title">{{ props.cost.title }}</h3>
        <div class="cost__headerBox__iconBox">
          <DeleteBtnIcon :onClick="onDelete" />
        </div>
      </div>
      <div class="cost__amount">{{ props.cost.amount + " " + props.currency }}</div>
      <div
        class="cost__info cost__groupTitle"
        @click="filterCostsByGroup(props.cost.group_id)"
      >
        {{ $t("costs.group") }}: {{ groupName }}
      </div>
      <div
        class="cost__info cost__budgetTitle"
        @click="filteredCostsByBudget(props.cost.budget_id)"
      >
        {{ $t("costs.budget") }}: {{ budgetName }}
      </div>
      <div v-if="props.cost.description" @click="openDescr" class="cost__showMore">
        {{ $t("common.moreInfo") }}
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import "./CostItem.scss";
</style>
