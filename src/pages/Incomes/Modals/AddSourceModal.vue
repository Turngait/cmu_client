<template>
  <PopUp :header="$t('incomes.addSource')" :onClose="onClose">
    <label>
      <TextInput
        :placeholder="$t('incomes.title') + '...'"
        @inputChange="(data) => (title = data)"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <p class="modal_msg">{{ msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveSource"
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

// import TxtArea from "../../components/controls/TxtArea.vue";

export default {
  name: "AddSourceModal",
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
  props: ["onClose", "addSource", "msg"],
  methods: {
    async saveSource() {
      const account_id = localStorage.getItem("accountId");
      const source = {
        title: this.title,
        description: "",
        order: 0,
        account_id,
      };
      await this.addSource(source);
    },
  },
};
</script>

<style lang="scss" scoped></style>
