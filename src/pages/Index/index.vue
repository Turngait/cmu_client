<template>
  <div class="dashboard">
    <RecoveryModal
      v-if="recoveryOpen"
      :onClose="toggleOpenRecovery"
      :onRecoveryPass="onRecoveryPass"
    />
    <Contacts v-if="isContactsOpen" :onClose="toggleOpenContacts" />
    <SignIn
      :recoveryOpen="toggleOpenRecovery"
      :auth="auth"
      v-if="signInOpen"
      :onClose="signInToggle"
    />
    <SignUp :onClose="signUpToggle" :auth="auth" v-if="signUpOpen" />
    <header class="dashboard__header">
      <nav class="dashboard__header__nav">
        <a class="dashboard__header__nav__item" href="#about">{{
          $t("index.aboutBtn")
        }}</a>
        <p class="dashboard__header__nav__item" @click="toggleOpenContacts">
          {{ $t("common.contacts") }}
        </p>
      </nav>
      <section class="dashboard__header__controlBox">
        <Button :title="$t('index.signUp')" :onClick="signUpToggle" />
        <Button
          :title="$t('index.signIn')"
          class="dashboard__header__controlBox__btn2"
          :onClick="signInToggle"
        />
        <button
          class="dashboard__leftBox__textBox__btnLocale"
          @click="switchLocale('en')"
          v-if="$i18n.locale === 'ru'"
        >
          En
        </button>
        <button
          class="dashboard__leftBox__textBox__btnLocale"
          @click="switchLocale('ru')"
          v-else
        >
          Ru
        </button>
      </section>
    </header>
    <div class="dashboard__firstScreen">
      <div class="dashboard__leftBox">
        <div class="dashboard__leftBox__textBox">
          <h1
            class="dashboard__leftBox__textBox__header mainHeader bigMarginBottom"
          >
            <p class="betaVersion">Beta version</p>
            CalcMeUp
          </h1>
          <p class="dashboard__leftBox__textBox__text mediumMarginBottom">
            {{ $t("index.about") }}
          </p>
          <p class="dashboard__leftBox__textBox__text smallMarginBottom">
            {{ $t("index.about2") }}
          </p>
          <div
            class="dashboard__leftBox__textBox__text flexBox smallMarginBottom alignTextCenter"
          >
            <div>
              <a
                href="https://github.com/Turngait/fincloud_client_vue"
                target="_blanc"
                class="dashboard__leftBox__textBox__text__link"
              >
                <img
                  src="../../assets/icons/git.png"
                  alt="git icon"
                  class="dashboard__leftBox__textBox__text__img"
                />
                <p>Client</p>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Turngait/fincloud_client_vue"
                target="_blanc"
                class="dashboard__leftBox__textBox__text__link"
              >
                <img
                  src="../../assets/icons/git.png"
                  alt="git icon"
                  class="dashboard__leftBox__textBox__text__img"
                />
                <p>Api</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__rightBox">
        <img
          class="dashboard__rightBox__img"
          src="../../assets/screens_big.png"
          alt="Screens"
        />
      </div>
    </div>
    <div id="about" class="dashboard__secondScreen">
      <div class="dashboard__secondScreen__infoBox">
        <div class="dashboard__secondScreen__infoBox__item">
          <div class="dashboard__secondScreen__infoBox__item__text">
            {{ $t("index.secondAbout1") }}
            <br />
            <br />
            {{ $t("index.secondAbout2") }}
            <br />
            <br />
            {{ $t("index.secondAbout3") }}
          </div>
          <div class="dashboard__secondScreen__infoBox__item__imgBox">
            <img
              src="../../assets/about2.png"
              class="dashboard__secondScreen__infoBox__item__imgBox__img"
            />
          </div>
        </div>

        <div class="dashboard__secondScreen__infoBox__item">
          <div class="dashboard__secondScreen__infoBox__item__imgBox">
            <img
              src="../../assets/about1.png"
              class="dashboard__secondScreen__infoBox__item__imgBox__img"
            />
          </div>
          <div class="dashboard__secondScreen__infoBox__item__text">
            {{ $t("index.secondAbout4") }}
            <br />
            <br />
            {{ $t("index.secondAbout5") }}
            <br />
            <br />
            {{ $t("index.secondAbout6") }}
            <br />
            <br />
            {{ $t("index.secondAbout7") }}
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard__footer">
      <p>FinCloud 2023</p>
      <p>
        <a class="dashboard__footer__link" href="terms.html" target="_blank">{{
          $t("index.policy")
        }}</a>
      </p>
      <p class="dashboard__footer__link" @click="toggleOpenContacts">
        {{ $t("common.contacts") }}
      </p>
    </div>
  </div>
</template>

<script>
import SignUp from "./Modals/SignUp.vue";
import SignIn from "./Modals/SignIn.vue";
import Button from "../../components/controls/Button.vue";
import Contacts from "./Modals/Contacts.vue";
import RecoveryModal from "./Modals/RecoveryModal.vue";
import { recoveryEmailService } from "./services";

import { ENDPOINTS } from "../../config/api";
import API_KEY from "../../config/key";

export default {
  name: "index-main",
  data() {
    return {
      recoveryOpen: false,
      signUpOpen: false,
      signInOpen: false,
      isContactsOpen: false,
    };
  },
  components: {
    SignUp,
    SignIn,
    Contacts,
    RecoveryModal,
    Button,
  },
  methods: {
    toggleOpenRecovery() {
      this.signInToggle();
      this.recoveryOpen = !this.recoveryOpen;
    },
    async onRecoveryPass(email) {
      return await recoveryEmailService(email);
    },
    switchLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    signUpToggle() {
      this.signUpOpen = !this.signUpOpen;
    },
    signInToggle() {
      this.signInOpen = !this.signInOpen;
    },
    async checkApiService() {
      const res = await fetch(ENDPOINTS.test, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "API-KEY": API_KEY,
        },
      });

      console.log(res);
    },
    auth(data) {
      this.$store.commit("user/setToken", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("accountId", data.accountId);
      this.$router.push({ path: "/dashboard" });
    },
    toggleOpenContacts() {
      this.isContactsOpen = !this.isContactsOpen;
    },
  },
  async mounted() {
    const locale = localStorage.getItem("locale");
    if (locale) this.switchLocale(locale);
    // await this.checkApiService();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
