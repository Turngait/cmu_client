<template>
  <PopUp :header="$t('accounts.add')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('accounts.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <label>
      <TextInput
        typeInput="number"
        :placeholder="$t('accounts.initialBalance') + '...'"
        @inputChange="(data) => (amount = data)"
        dataTest="balance"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <select class="modal__select" v-model="currency">
      <option
        v-for="curr of currencies"
        :key="curr.abbreviation"
        :value="curr.abbreviation"
      >
        {{ curr.currency }}
      </option>
    </select>
    <TxtArea
      :placeholder="$t('accounts.description') + '...'"
      @areaChange="(data) => (description = data)"
    />
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveAccount"
      :title="$t('common.add')"
      dataTest="addAccountBtn"
    />
  </PopUp>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import TxtArea from "../../../components/controls/TxtArea.vue";
import PopUp from "../../../components/partials/PopUp.vue";

export default {
  name: "AddAccountModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      description: "",
      currency: "$",
      amount: 0,
    };
  },
  validations() {
    return {
      title: { required },
      amount: { required },
    };
  },
  components: { Button, TextInput, TxtArea, PopUp },
  props: ["onClose", "currencies", "msg", "addAccount"],
  methods: {
    saveAccount() {
      const newAccount = {
        title: this.title,
        description: this.description,
        currency: this.currency,
        balance: this.amount,
        created_at: new Date(),
      };
      this.addAccount(newAccount);
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
  &__select {
    border: 1px solid $light-grey;
    border-radius: 5px;
    padding: 7px 20px;
    font-size: 1.6rem;
    width: 100%;
    background: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
