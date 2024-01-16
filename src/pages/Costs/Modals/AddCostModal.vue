<script setup>
  import { ref, defineProps, computed } from 'vue';
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-bootstrap.css';
  import { useVuelidate } from "@vuelidate/core";
  import { required, minValue, helpers } from "@vuelidate/validators";

  import PopUp from "../../../components/partials/PopUp.vue";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import TxtArea from "../../../components/controls/TxtArea.vue";
  import AddGroupModal from "./AddGroupModal.vue";
  import Select from "../../../components/controls/Select.vue";
  import SelectBudgets from "../../../components/controls/SelectBudgets.vue";

  const props = defineProps(["onClose", "groups", "budgets", "addCost", "addGroup", "msg"]);
  const $toast = useToast({ position: "top" });

  const date = ref(new Date().toISOString().slice(0, 10));

  const title = ref('');
  const amount = ref('');
  const descr = ref('');
  const isAddGroupOpen = ref(false);

  const groupId = ref(Array.isArray(props.groups) && props.groups.length > 0 ? props.groups[0].id : '');
  const budgetId = ref(Array.isArray(props.budgets) && props.budgets.length > 0 ? props.budgets[0].id : '');

  const mustBeCurrency = helpers.regex(/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/);

  const rules = computed(() => ({ 
      title: { required },
      amount: {
        minValueValue: minValue(0), 
        required,
        mustBeCurrency
      },
    }));
  const v$ = useVuelidate(rules, { title, amount });

  async function saveCost() {
    const accountId = localStorage.getItem("accountId");
    const cost = {
      title: title.value,
      date: date.value,
      amount: amount.value,
      group_id: groupId.value,
      budget_id: budgetId.value,
      description: descr.value,
      account_id: accountId,
      month: new Date(date.value).getMonth() + 1,
      year: new Date(date.value).getFullYear(),
    };

    await props.addCost(cost);
  }
  function toggleAddGroupOpen() {
    isAddGroupOpen.value = !isAddGroupOpen.value;
  }
  async function addGroupHandler(group) {
    const result = await props.addGroup(group);
    if (result) {
      toggleAddGroupOpen();
      $toast.info("Group is added");
    } else {
      $toast.info("Something is went wrong");
    }
  }

</script>

<template>
  <AddGroupModal
    v-if="isAddGroupOpen"
    :onClose="toggleAddGroupOpen"
    :addGroup="addGroupHandler"
    :msg="msg"
  />
  <PopUp :header="$t('costs.add')" :onClose="props.onClose" v-else>
    <TextInput typeInput="date" @inputChange="(data) => (date = data)" />
    <label>
      <TextInput
        :placeholder="$t('costs.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <label>
      <TextInput
        :placeholder="$t('costs.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
        dataTest="amount"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <div class="modal__addGroupBox">
      <Select
        :data="groups"
        @selectChange="(data) => (groupId = data)"
        :selectedId="groupId"
      />
      <Button :onClick="toggleAddGroupOpen" title="+" />
    </div>
    <SelectBudgets
      :data="budgets"
      @selectChange="(data) => (budgetId = data)"
      :selectedId="budgetId"
    />
    <TxtArea
      :placeholder="$t('costs.description') + '...'"
      @areaChange="(data) => (descr = data)"
    />
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid && !v$.amount.$invalid"
      :onClick="saveCost"
      :title="$t('common.add')"
      dataTest="addCostsBtn"
    />
  </PopUp>
</template>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.modal {
  &__addGroupBox {
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

.selectCost {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
  background: $white;
}
</style>
