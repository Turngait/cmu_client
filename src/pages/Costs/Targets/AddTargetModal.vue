<template>
  <PopUp class="overlay" :header="$t('costs.addTarget')" :onClose="onClose">
    <select class="selectCost" v-model="type">
      <option value="day" selected>
        {{ $t("costs.targetTypeDay") }}
      </option>
      <option value="month" selected>
        {{ $t("costs.targetTypeMonth") }}
      </option>
    </select>
    <label>
      <TextInput
        :placeholder="$t('costs.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <select class="selectCost" v-model="groupId" v-if="type !== 'day'">
      <option v-for="group in groups" :key="group.id" :value="group.id">
        {{ group.title }}
      </option>
    </select>
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="saveTarget"
      :title="$t('common.add')"
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
  name: "AddTargetModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      type: "day",
      amount: "",
      groupId:
        Array.isArray(this.groups) && this.groups.length > 0
          ? this.groups[0].id
          : "",
    };
  },
  validations() {
    return {
      amount: { required },
    };
  },
  components: { Button, TextInput, PopUp },
  props: ["onClose", "groups", "addTarget", "msg"],
  methods: {
    async saveTarget() {
      const accountId = localStorage.getItem("accountId");
      const target = {
        type: this.type,
        amount: +this.amount,
        group_id: this.groupId,
        account_id: accountId,
      };

      await this.addTarget(target);
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
