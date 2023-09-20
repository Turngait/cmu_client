<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__headerBox">
        <h3 class="modal__headerBox__title">Восстановление пароля</h3>
        <CloseBtnIcon :onClick="onClose" />
      </div>
      <p class="modal__msg">{{ msg }}</p>
      <TextInput
        :placeholder="$t('index.yourEmail')"
        typeInput="email"
        @inputChange="(data) => (email = data)"
      />
      <Button
        :isActive="!v$.email.$invalid"
        :onClick="recoveryHandler"
        :title="$t('common.ok')"
      />
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import CloseBtnIcon from "../../../components/icons/CloseBtn.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import Button from "../../../components/controls/Button.vue";

export default {
  name: "RecoveryModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      msg: "",
    };
  },
  validations() {
    return {
      email: { required },
    };
  },
  components: { CloseBtnIcon, TextInput, Button },
  props: ["onClose", "onRecoveryPass"],
  methods: {
    async recoveryHandler() {
      this.msg = await this.onRecoveryPass(this.email);
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $black-transp;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: 42rem;
  background: $white;
  border: 1px solid rgba(230, 230, 230, 0.65);
  box-shadow: 4px 4px 8px rgba(68, 68, 68, 0.25);
  border-radius: 5px;
  color: $black;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &__headerBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;

    &__title {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }

  &__msg {
    font-size: 1.4rem;
    color: $black;
  }
}
</style>
