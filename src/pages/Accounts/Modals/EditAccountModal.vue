<template>
  <PopUp :header="$t('accounts.edit')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('accounts.title') + '...'"
        @inputChange="(data) => (title = data)"
        :val="title"
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
      :val="description"
    />
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveAccount"
      :title="$t('common.save')"
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
  name: "EditAccountModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: this.item.title,
      description: this.item.description,
      currency: this.item.currency,
    };
  },
  validations() {
    return {
      title: { required },
    };
  },
  components: { Button, TextInput, TxtArea, PopUp },
  props: ["onClose", "currencies", "msg", "onEdit", "item"],
  methods: {
    async saveAccount() {
      const account = {
        id: this.item.id,
        title: this.title,
        description: this.description,
        currency: this.currency,
        balance: this.item.balance,
        created_at: this.item.created_at,
      };
      await this.onEdit(account);
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
