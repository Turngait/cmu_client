<template>
  <div class="overlay">
    <div class="modal">
      <div class="signUp">
        <div class="signUp__headerBox">
          <h2 class="signUp__heading">{{ $t("index.signUp") }}</h2>
          <CloseBtnIcon :onClick="onClose" />
        </div>
        <p v-if="msg" class="signUp__text__signUp__msg">{{ msg }}</p>
        <div class="signUp__form">
          <TextInput
            @inputChange="changeName"
            :placeholder="$t('index.yourName')"
            dataTest="userName"
          />
          <TextInput
            @inputChange="changeEmail"
            typeInput="email"
            :placeholder="$t('index.yourEmail')"
            dataTest="userEmail"
          />
          <TextInput
            @inputChange="changePass"
            typeInput="password"
            :placeholder="$t('index.yourPass')"
            dataTest="userPass"
          />
          <TextInput
            @inputChange="changeAccTitle"
            :placeholder="$t('index.accountTitle')"
            dataTest="userAcc"
          />
          <TextInput
            @inputChange="changeInitBalance"
            typeInput="number"
            :placeholder="$t('index.initBalance')"
            dataTest="userBalance"
          />
          <select class="signUp__form__select" v-model="currency">
            <option
              v-for="curr of currencies"
              :key="curr.abbreviation"
              :value="curr.abbreviation"
            >
              {{ curr.currency }}
            </option>
          </select>
          <Button
            :isActive="
              !v$.name.$invalid &&
              !v$.email.$invalid &&
              !v$.password.$invalid &&
              !v$.accountTitle.$invalid
            "
            class="signUp__form__btn"
            title="Go!"
            :onClick="signUpHandler"
          />
        </div>
        <p class="signUp__disclaimer">
          {{ $t("index.descAtSignUp") }}
          <a href="terms.html" target="_blank" class="signUp__disclaimer__link"
            >"{{ $t("index.policy") }}"</a
          >
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

import { signUpService } from "../services";

import currencies from "../../../assets/currency-symbols.json";

export default {
  name: "SignUp",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      accountTitle: "",
      initialBalance: 0,
      currency: "руб",
      msg: "",
      currencies,
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required },
      accountTitle: { required },
    };
  },
  props: ["onClose", "auth"],
  components: {
    Button,
    TextInput,
    CloseBtnIcon,
  },
  methods: {
    changeName(newName) {
      this.name = newName;
    },
    changeEmail(email) {
      this.email = email;
    },
    changePass(pass) {
      this.password = pass;
    },
    changeAccTitle(title) {
      this.accountTitle = title;
    },
    changeInitBalance(balance) {
      this.initialBalance = balance;
    },
    signUpHandler() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        accountTitle: this.accountTitle,
        initialBalance: this.initialBalance,
        currency: this.currency,
      };
      signUpService(newUser, (msg) => (this.msg = msg), this.auth);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/src/styles/main.scss";
.signUp {
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
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__select {
      border: 1px solid $light-grey;
      border-radius: 5px;
      padding: 7px 20px;
      font-size: 1.6rem;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }

  &__disclaimer {
    font-size: 1.2rem;
    width: 90%;
    text-align: center;

    &__link {
      color: $black;
    }
  }

  &__recovery {
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.2rem;
    width: 40%;
    text-align: center;
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
</style>
