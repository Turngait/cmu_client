<script setup>
  import { ref, defineProps, computed } from 'vue';
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-bootstrap.css';
  import { useVuelidate } from "@vuelidate/core";
  import { required,  minValue, helpers } from "@vuelidate/validators";

  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import TxtArea from "../../../components/controls/TxtArea.vue";
  import AddSourceModal from "./AddSourceModal.vue";
  import PopUp from "../../../components/partials/PopUp.vue";
  import SelectBudgets from "../../../components/controls/SelectBudgets.vue";
  import Select from "../../../components/controls/Select.vue";

  const $toast = useToast({ position: "top" });

  const props = defineProps([
    "onClose",
    "sources",
    "budgets",
    "addIncome",
    "addSource",
    "msg",
  ]);

  const date = ref(new Date().toISOString().slice(0, 10));
  const title = ref('');
  const amount = ref('');
  const sourceId = ref(Array.isArray(props.sources) && props.sources.length > 0
          ? props.sources[0].id
          : "");
  const budgetId = ref(Array.isArray(props.budgets) && props.budgets.length > 0
          ? props.budgets[0].id
          : "");
  const descr = ref('');
  const isAddSourceOpen = ref(false);

  const mustBeCurrency = helpers.regex(/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/);

  const rules = computed(() => ({ 
      title: { required },
      amount: {
        required,
        mustBeCurrency,
        minValueValue: minValue(0),
      },
    }));
  const v$ = useVuelidate(rules, { title, amount });

  async function saveIncome() {
    const accountId = localStorage.getItem("accountId");

    const income = {
      date: date.value,
      title: title.value,
      budget_id: budgetId.value,
      source_id: sourceId.value,
      amount: amount.value,
      description: descr.value,
      month: new Date(date.value).getMonth() + 1,
      year: new Date(date.value).getFullYear(),
      account_id: accountId,
    };
    await props.addIncome(income);
  }
  async function addSourceHandler(source) {
    const result = await props.addSource(source);
    if (result) {
      toggleAddSourceOpen();
      $toast.info("Source is added");
    } else {
      $toast.info("Something is went wrong");
    }
  }
  function toggleAddSourceOpen() {
    isAddSourceOpen.value = !isAddSourceOpen.value;
  }
</script>

<template>
  <AddSourceModal
    v-if="isAddSourceOpen"
    :onClose="toggleAddSourceOpen"
    :addSource="addSourceHandler"
    :msg="props.msg"
  />
  <PopUp :header="$t('incomes.add')" :onClose="props.onClose" v-else>
    <TextInput typeInput="date" @inputChange="(data) => (date = data)" />
    <label>
      <TextInput
        :placeholder="$t('incomes.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
        :max-length="18"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <label>
      <TextInput
        :placeholder="$t('incomes.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
        dataTest="amount"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <div class="modal__addSourceBox">
      <Select
        :data="props.sources"
        @selectChange="(data) => (sourceId = data)"
        :selectedId="sourceId"
      />
      <Button :onClick="toggleAddSourceOpen" title="+" />
    </div>
    <SelectBudgets
      :data="props.budgets"
      @selectChange="(data) => (budgetId = data)"
      :selectedId="budgetId"
    />
    <TxtArea
      :placeholder="$t('incomes.description') + '...'"
      @areaChange="(data) => (descr = data)"
    />
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid && !v$.amount.$invalid"
      :onClick="saveIncome"
      :title="$t('common.add')"
      dataTest="addIncomeBtn"
    />
  </PopUp>
</template>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.modal {
  &__addSourceBox {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}

.selectIncome {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
  background: $white;
}
</style>
