<template>
  <PopUp :header="$t('budgets.edit')" :onClose="onClose">
    <TextInput
      :placeholder="$t('budgets.title') + '...'"
      @inputChange="(data) => (title = data)"
      :val="title"
    />
    <!-- <label>
        <input type="checkbox" v-model="isCalc" />
        {{ $t("budgets.isCalc") }}
      </label> -->
    <Button :onClick="saveBudget" :title="$t('common.save')" />
  </PopUp>
</template>

<script>
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import PopUp from "../../../components/partials/PopUp.vue";

export default {
  name: "EditBudgetModal",
  data() {
    return {
      balance: this.budget.balance,
      title: this.budget.title,
      isCalc: this.budget.is_calculated,
    };
  },
  components: { Button, TextInput, PopUp },
  props: ["onClose", "editBudget", "budget"],
  methods: {
    saveBudget() {
      const budget = {
        id: this.budget.id,
        title: this.title,
        balance: this.balance,
        is_calculating: this.isCalc,
        created_at: this.budget.created_at,
      };
      this.editBudget(budget);
    },
  },
};
</script>

<style lang="scss" scoped></style>
