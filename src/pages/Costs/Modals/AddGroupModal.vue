<template>
  <PopUp :header="$t('costs.addGroup')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('costs.title') + '...'"
        @inputChange="(data) => (title = data)"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveGroup"
      :title="$t('common.add')"
    />
  </PopUp>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import PopUp from "../../../components/partials/PopUp.vue";
import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";

export default {
  name: "AddCostModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      descr: "",
    };
  },
  validations() {
    return {
      title: { required },
    };
  },
  components: { Button, TextInput, PopUp },
  props: ["onClose", "addGroup", "msg"],
  methods: {
    async saveGroup() {
      const account_id = localStorage.getItem("accountId");

      const group = {
        title: this.title,
        description: this.descr,
        order: 0,
        account_id,
      };
      await this.addGroup(group);
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
