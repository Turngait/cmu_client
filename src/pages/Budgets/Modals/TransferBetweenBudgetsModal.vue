<template>
  <PopUp :header="$t('budgets.add')" :onClose="onClose">
    <label>
      <div>{{ $t('budgets.transfer.from') }}</div>
      <SelectBudgets
        :data="budgets"
        @selectChange="(data) => (fromBudgetId = data)"
        :selectedId="fromBudgetId"
      />
    </label>
    <label>
      <div>{{ $t('budgets.transfer.to') }}</div>
      <SelectBudgets
        :data="budgets"
        @selectChange="(data) => (toBudgetId = data)"
        :selectedId="toBudgetId"
      />
    </label>
    <label>
      <TextInput
        :placeholder="$t('budgets.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
        dataTest="amount"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="startTransfer"
      :title="$t('budgets.transfer.start')"
      dataTest="addBudgetBtn"
    />
  </PopUp>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue } from "@vuelidate/validators";
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import PopUp from "../../../components/partials/PopUp.vue";
import SelectBudgets from "../../../components/controls/SelectBudgets.vue";

export default {
  name: "transfer-between-budgets-modal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      fromBudgetId: this.budgets[0].id,
      toBudgetId: this.budgets[1].id,
      amount: null
    };
  },
  validations() {
    const mustBeCurrency = helpers.regex(/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/);

    return {
      amount: {
        minValueValue: minValue(0), 
        required,
        mustBeCurrency
      },
    };
  },
  components: { Button, TextInput, PopUp, SelectBudgets },
  props: ["onClose", "onTransfer", "msg", "budgets"],
  methods: {
    async startTransfer() {
      await this.onTransfer(this.fromBudgetId, this.toBudgetId, this.amount);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.modal {
  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}
</style>
