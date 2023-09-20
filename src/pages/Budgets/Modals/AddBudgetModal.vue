<template>
  <PopUp :header="$t('budgets.add')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('budgets.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <!-- <label>
        <input type="checkbox" v-model="isCalc" />
        {{ $t("budgets.isCalc") }}
      </label> -->
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveBudget"
      :title="$t('common.add')"
      dataTest="addBudgetBtn"
    />
  </PopUp>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import PopUp from "../../../components/partials/PopUp.vue";

export default {
  name: "AddBudgetModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      isCalc: true,
      description: "",
    };
  },
  validations() {
    return {
      title: { required },
    };
  },
  components: { Button, TextInput, PopUp },
  props: ["onClose", "addBudget", "msg"],
  methods: {
    saveBudget() {
      const accountId = localStorage.getItem("accountId");
      const budget = {
        title: this.title,
        description: this.description,
        is_calculating: this.isCalc,
        account_id: accountId,
        created_at: new Date(),
      };
      this.addBudget(budget);
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
