<template>
  <AddSourceModal
    v-if="isAddSourceOpen"
    :onClose="toggleAddSourceOpen"
    :addSource="addSourceHandler"
    :msg="msg"
  />
  <PopUp :header="$t('incomes.add')" :onClose="onClose" v-else>
    <TextInput typeInput="date" @inputChange="(data) => (date = data)" />
    <label>
      <TextInput
        :placeholder="$t('incomes.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
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
      <select class="selectCost" v-model="sourceId">
        <option v-for="item in sources" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
      <Button :onClick="toggleAddSourceOpen" title="+" />
    </div>
    <select class="selectCost" v-model="budgetId">
      <option v-for="item in budgets" :key="item.id" :value="item.id">
        {{ item.title }}
      </option>
    </select>
    <TxtArea
      :placeholder="$t('incomes.description') + '...'"
      @areaChange="(data) => (descr = data)"
    />
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid && !v$.amount.$invalid"
      :onClick="saveIncome"
      :title="$t('common.add')"
      dataTest="addIncomeBtn"
    />
  </PopUp>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import TxtArea from "../../../components/controls/TxtArea.vue";
import AddSourceModal from "./AddSourceModal.vue";
import PopUp from "../../../components/partials/PopUp.vue";

export default {
  name: "AddIncomeModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      title: "",
      amount: "",
      sourceId:
        Array.isArray(this.sources) && this.sources.length > 0
          ? this.sources[0].id
          : "",
      budgetId:
        Array.isArray(this.budgets) && this.budgets.length > 0
          ? this.budgets[0].id
          : "",
      descr: "",
      isAddSourceOpen: false,
    };
  },
  validations() {
    return {
      title: { required },
      amount: { required },
    };
  },
  methods: {
    async saveIncome() {
      const accountId = localStorage.getItem("accountId");

      const income = {
        date: this.date,
        title: this.title,
        budget_id: this.budgetId,
        source_id: this.sourceId,
        amount: this.amount,
        description: this.descr,
        month: new Date(this.date).getMonth() + 1,
        year: new Date(this.date).getFullYear(),
        account_id: accountId,
      };
      await this.addIncome(income);
    },
    async addSourceHandler(source) {
      const result = await this.addSource(source);
      if (result) {
        this.toggleAddSourceOpen();
        this.$toast.info("Source is added");
      } else {
        this.$toast.info("Something is went wrong");
      }
    },
    toggleAddSourceOpen() {
      this.isAddSourceOpen = !this.isAddSourceOpen;
    },
  },
  components: { Button, TextInput, TxtArea, AddSourceModal, PopUp },
  props: [
    "onClose",
    "sources",
    "budgets",
    "addCost",
    "addIncome",
    "addSource",
    "msg",
  ],
};
</script>

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

.selectCost {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
  background: $white;
}
</style>
