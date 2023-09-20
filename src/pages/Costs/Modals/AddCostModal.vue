<template>
  <AddGroupModal
    v-if="isAddGroupOpen"
    :onClose="toggleAddGroupOpen"
    :addGroup="addGroupHandler"
    :msg="msg"
  />
  <PopUp :header="$t('costs.add')" :onClose="onClose" v-else>
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

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import PopUp from "../../../components/partials/PopUp.vue";
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import TxtArea from "../../../components/controls/TxtArea.vue";
import AddGroupModal from "./AddGroupModal.vue";
import Select from "../../../components/controls/Select.vue";
import SelectBudgets from "../../../components/controls/SelectBudgets.vue";

export default {
  name: "AddCostModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      title: "",
      amount: "",
      groupId:
        Array.isArray(this.groups) && this.groups.length > 0
          ? this.groups[0].id
          : "",
      budgetId:
        Array.isArray(this.budgets) && this.budgets.length > 0
          ? this.budgets[0].id
          : "",
      descr: "",
      isAddGroupOpen: false,
    };
  },
  validations() {
    return {
      title: { required },
      amount: { required },
    };
  },
  components: {
    Button,
    TextInput,
    TxtArea,
    AddGroupModal,
    PopUp,
    Select,
    SelectBudgets,
  },
  props: ["onClose", "groups", "budgets", "addCost", "addGroup", "msg"],
  methods: {
    async saveCost() {
      const accountId = localStorage.getItem("accountId");
      const cost = {
        title: this.title,
        date: this.date,
        amount: this.amount,
        group_id: this.groupId,
        budget_id: this.budgetId,
        description: this.descr,
        account_id: accountId,
        month: new Date(this.date).getMonth() + 1,
        year: new Date(this.date).getFullYear(),
      };

      await this.addCost(cost);
    },
    toggleAddGroupOpen() {
      this.isAddGroupOpen = !this.isAddGroupOpen;
    },
    async addGroupHandler(group) {
      const result = await this.addGroup(group);
      if (result) {
        this.toggleAddGroupOpen();
        this.$toast("Group is added");
      } else {
        this.$toast("Something is went wrong");
      }
    },
  },
};
</script>

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
