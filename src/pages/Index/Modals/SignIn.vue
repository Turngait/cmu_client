<template>
  <div class="overlay">
    <div class="modal">
      <div class="signIn">
        <div class="signIn__headerBox">
          <h2 class="signIn__heading">{{ $t("index.signIn") }}</h2>
          <CloseBtnIcon :onClick="onClose" />
        </div>
        <p v-if="msg" class="signUp__text__signUp__msg">{{ msg }}</p>
        <div class="signIn__form">
          <TextInput
            @inputChange="changeEmail"
            :placeholder="$t('index.yourEmail')"
            typeInput="e-mail"
            name="e-mail"
            dataTest="userEmail"
          />
          <TextInput
            @inputChange="changePass"
            :placeholder="$t('index.yourPass')"
            typeInput="password"
            dataTest="userPass"
          />
          <Button
            :isActive="!v$.email.$invalid && !v$.password.$invalid"
            class="signIn__form__btn"
            title="Go!"
            :onClick="signInHandler"
          />
        </div>
        <p class="signIn__recovery" @click="onRecoveryPass">
          {{ $t("index.retrivePass") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import Button from "../../../components/controls/Button.vue";
import TextInput from "../../../components/controls/TextInput.vue";
import CloseBtnIcon from "../../../components/icons/CloseBtn.vue";

import { signInService } from "../services";

export default {
  name: "SignIn",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      msg: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  props: ["auth", "recoveryOpen", "onClose"],
  components: {
    Button,
    TextInput,
    CloseBtnIcon,
  },
  methods: {
    changeEmail(email) {
      this.email = email;
    },
    changePass(pass) {
      this.password = pass;
    },
    signInHandler() {
      const user = {
        email: this.email,
        password: this.password,
      };
      signInService(user, (msg) => (this.msg = msg), this.auth);
    },
    onRecoveryPass() {
      this.recoveryOpen();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/src/styles/main.scss";

.signIn {
  width: 100%;
  font-size: 1.6rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__headerBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
  }

  &__heading {
    font-size: 2.4rem;
  }

  &__text {
    font-size: 1.6rem;

    &__signUp {
      cursor: pointer;
      text-decoration: underline;

      &__msg {
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__recovery {
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.2rem;
  }
}

.overlay {
  position: fixed;
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
}

@media all and (min-width: 0) and (max-width: 800px) {
  .signIn {
    padding: 1rem;
    width: auto;
  }
}
</style>
