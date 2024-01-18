<script setup>
  import { ref, defineProps, computed } from 'vue';

  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers, minValue } from "@vuelidate/validators";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";
  import SelectBudgets from "../../../components/controls/SelectBudgets.vue";

  const props = defineProps(["onClose", "onTransfer", "msg", "budgets"]);

  const fromBudgetId = ref(props.budgets[0].id);
  const toBudgetId = ref(props.budgets[1].id);
  const amount = ref(null);

  async function startTransfer() {
    await props.onTransfer(fromBudgetId.value, toBudgetId.value, amount.value);
  }

  const mustBeCurrency = helpers.regex(/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/);

  const rules = computed(() => ({ 
      amount: {
        required,
        mustBeCurrency,
        minValueValue: minValue(0),
      },
    }));
  const v$ = useVuelidate(rules, { amount });

</script>

<template>
  <PopUp :header="$t('budgets.add')" :onClose="props.onClose">
    <label>
      <div>{{ $t('budgets.transfer.from') }}</div>
      <SelectBudgets
        :data="props.budgets"
        @selectChange="(data) => (fromBudgetId = data)"
        :selectedId="fromBudgetId"
      />
    </label>
    <label>
      <div>{{ $t('budgets.transfer.to') }}</div>
      <SelectBudgets
        :data="props.budgets"
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
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="startTransfer"
      :title="$t('budgets.transfer.start')"
      dataTest="addBudgetBtn"
    />
  </PopUp>
</template>

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
