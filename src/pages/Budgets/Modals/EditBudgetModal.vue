<script setup>
  import { ref, defineProps } from 'vue';

  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "editBudget", "budget"]);

  const balance = ref(props.budget.balance);
  const title = ref(props.budget.title);
  const isCalc = ref(props.budget.is_calculated);

  function saveBudget() {
    const budget = {
      id: props.budget.id,
      title: title.value,
      balance: balance.value,
      is_calculating: isCalc.value,
      created_at: props.budget.created_at,
    };
    props.editBudget(budget);
  }

</script>

<template>
  <PopUp :header="$t('budgets.edit')" :onClose="props.onClose">
    <TextInput
      :placeholder="$t('budgets.title') + '...'"
      @inputChange="(data) => (title = data)"
      :val="title"
      :max-length="18"
    />
    <!-- <label>
        <input type="checkbox" v-model="isCalc" />
        {{ $t("budgets.isCalc") }}
      </label> -->
    <Button :onClick="saveBudget" :title="$t('common.save')" />
  </PopUp>
</template>

<style lang="scss" scoped></style>
