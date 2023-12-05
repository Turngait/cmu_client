<template>
  <!-- TODO Decompose this component -->
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
        <a href="https://t.me/calcmeup" target="_blanc">
          <img class="dashboard__header__nav__icon" src="../../assets/icons/tg-ico.svg" alt="Tg channel" />
        </a>
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
              src="../../assets/img2.png"
              class="dashboard__secondScreen__infoBox__item__imgBox__img"
            />
          </div>
        </div>

        <div class="dashboard__secondScreen__infoBox__item">
          <div class="dashboard__secondScreen__infoBox__item__imgBox">
            <img
              src="../../assets/img1.png"
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

    <div id="about" class="dashboard__thirdScreen">
      <div class="dashboard__thirdScreen__infoBox">
        <div class="dashboard__thirdScreen__infoBox__item">
          <div class="dashboard__thirdScreen__infoBox__item__text">
            {{ $t("index.thirdScreen.text1") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text2") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text3") }}
          </div>
          <div class="dashboard__thirdScreen__infoBox__item__imgBox">
            <img
              src="../../assets/costImg.png"
              class="dashboard__thirdScreen__infoBox__item__imgBox__img"
            />
          </div>
        </div>

        <div class="dashboard__thirdScreen__infoBox__item">
          <div class="dashboard__thirdScreen__infoBox__item__imgBox">
            <img
              src="../../assets/incomImg.png"
              class="dashboard__thirdScreen__infoBox__item__imgBox__img"
            />
          </div>
          <div class="dashboard__thirdScreen__infoBox__item__text">
            {{ $t("index.thirdScreen.text4") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text5") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text6") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text7") }}
          </div>
        </div>

        <div class="dashboard__thirdScreen__infoBox__item">
          <div class="dashboard__thirdScreen__infoBox__item__text">
            {{ $t("index.thirdScreen.text8") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text9") }}
            <br />
            <br />
            {{ $t("index.thirdScreen.text10") }}
          </div>
          <div class="dashboard__thirdScreen__infoBox__item__imgBox">
            <img
              src="../../assets/dashImg.png"
              class="dashboard__thirdScreen__infoBox__item__imgBox__img"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="about" class="dashboard__fourthScreen">
      <div class="dashboard__fourthScreen__infoBox">
        <p class="dashboard__fourthScreen__infoBox__text">{{ $t("index.fourthScreen.text1") }}</p>
        <div class="dashboard__fourthScreen__infoBox__flow">
          <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" class="dashboard__fourthScreen__infoBox__flow__item" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FrWdyzFX8DgSdhZWrMODoe1%2FFinCLoudUX%3Ftype%3Dwhiteboard%26node-id%3D0%253A1%26t%3DSTv10H177WCitTOD-1" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <div id="about" class="dashboard__fifthsScreen">
      <div class="dashboard__fifthsScreen__infoBox">
        <div class="dashboard__fifthsScreen__infoBox__item">
          <div class="dashboard__fifthsScreen__infoBox__item__text">
            {{ $t("index.fifthsScreen.text1") }}
            <br />
            <br />
            {{ $t("index.fifthsScreen.text2") }}
            <br />
            <br />
            {{ $t("index.fifthsScreen.text3") }}
          </div>
            <div class="dashboard__fifthsScreen__infoBox__iconsBox">
              <a href="https://www.typescriptlang.org/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/ts-ico.png" alt="TypeScript" title="TypeScript" /></a>
              <a href="https://vuejs.org/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/vue-ico.png" alt="VueJS" title="VueJS" /></a>
              <a href="https://nestjs.com/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/nest-ico.png" alt="NestJS" title="NestJS" /></a>
              <a href="https://flask.palletsprojects.com/en/3.0.x/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/flask-ico.png" alt="Flask" title="Flask" /></a>
              <a href="https://www.mysql.com/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/mysql-ico.png" alt="MongoDB" title="MongoDB" /></a>
              <a href="https://redis.io/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/redis-ico.png" alt="Redis" title="Redis" /></a>
              <a href="https://www.docker.com/" target="_blanc"><img class="dashboard__fifthsScreen__infoBox__iconsBox__ico" src="../../assets/icons/techs/docker-ico.png" alt="Docker" title="Docker" /></a>
            </div>
        </div>
        <div class="dashboard__fifthsScreen__infoBox__historyBox">
            <p @click="toggleOpenDevLogs" class="dashboard__fifthsScreen__infoBox__historyBox__title">+ History of development logs</p>
              <div class="dashboard__fifthsScreen__infoBox__historyBox__history" v-if="isHistoryOpen">
                <div :key="item.version" v-for="item in devLogs" class="dashboard__fifthsScreen__infoBox__historyBox__history__item">
                  <p class="dashboard__fifthsScreen__infoBox__historyBox__history__item__date">{{item.date}}</p>
                  <p class="dashboard__fifthsScreen__infoBox__historyBox__history__item__description">{{item.description}}</p>
                </div>
              </div>
          </div>
        <div class="dashboard__fifthsScreen__infoBox__item">
          <div
            class="dashboard__fifthsScreen__infoBox__item__icoItem flexBox alignTextCenter"
          >
            <div>
              <a
                href="https://github.com/Turngait/fincloud_client_vue"
                target="_blanc"
                class="dashboard__fifthsScreen__infoBox__item__icoItem__link"
              >
                <img
                  src="../../assets/icons/git.png"
                  alt="git icon"
                  class="dashboard__fifthsScreen__infoBox__item__icoItem__img"
                />
                <p>Client</p>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Turngait/fincloud_client_vue"
                target="_blanc"
                class="dashboard__fifthsScreen__infoBox__item__icoItem__link"
              >
                <img
                  src="../../assets/icons/git.png"
                  alt="git icon"
                  class="dashboard__fifthsScreen__infoBox__item__icoItem__img"
                />
                <p>Api</p>
              </a>
            </div>
          </div>
          <div class="dashboard__fifthsScreen__infoBox__item__text">
            {{ $t("index.fifthsScreen.text4") }}
            <a class="dashboard__fifthsScreen__infoBox__item__text__link" :href="'mailto:' + email">email</a>
          </div>
        </div>
      </div>
    </div>

    <footer class="dashboard__footer">
      <div class="dashboard__footer__leftBox">
        <p>2023 CalcMeUp</p>
        <p>
          <a class="dashboard__footer__link" href="terms.html" target="_blank">{{
            $t("index.policy")
          }}</a>
        </p>
        <p class="dashboard__footer__link" @click="toggleOpenContacts">
          {{ $t("common.contacts") }}
        </p>
      </div>
      <div class="dashboard__footer__rightBox">
        <a href="https://t.me/calcmeup" target="_blanc">
          <img class="dashboard__footer__rightBox__icon" src="../../assets/icons/tg-ico.svg" alt="Tg channel" />
        </a>
      </div>
    </footer>
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
import { EMAIL } from "../../config/api";
import API_KEY from "../../config/key";
import DevData from "../../assets/release.json";

export default {
  name: "index-main",
  data() {
    return {
      recoveryOpen: false,
      signUpOpen: false,
      signInOpen: false,
      isContactsOpen: false,
      email: EMAIL,
      isHistoryOpen: false,
      devLogs: []
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
      window.scrollTo(0, 0);
      this.isContactsOpen = !this.isContactsOpen;
    },

    toggleOpenDevLogs() {
      this.isHistoryOpen = !this.isHistoryOpen;
    }
  },
  async mounted() {
    const locale = localStorage.getItem("locale");
    if (locale) this.switchLocale(locale);
    this.devLogs = DevData;
    console.log(DevData);
    // await this.checkApiService();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
