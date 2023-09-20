<template>
  <PopUp :header="$t('costs.editTarget')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('costs.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
        :val="amount"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="saveTarget"
      :title="$t('common.save')"
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
  name: "EditTargetModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      amount: this.target.amount,
    };
  },
  validations() {
    return {
      amount: { required },
    };
  },
  components: { Button, TextInput, PopUp },
  props: ["onClose", "editTarget", "msg", "target"],
  methods: {
    async saveTarget() {
      const editableTarget = {
        id: this.target.id,
        type: this.target.type,
        amount: +this.amount,
        group_id: +this.target.group_id,
        account_id: +this.target.account_id,
      };

      await this.editTarget(editableTarget);
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
</style>
