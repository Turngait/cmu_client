<template>
  <div>
    <Navigation
      v-if="isMenuOpen"
      :closeNav="menuOpen"
      :logOut="logOut"
      :switchLocale="switchLocale"
      :initLocale="locale"
    />
    <div class="topMenu">
      <div class="topMenu__miniBox">
        <h1 class="topMenu__title" @click="goToDashboard">
          CalcMeUp <span class="betaVersion">Beta</span>
        </h1>
        <div class="topMenu__balance">{{ pageName }}</div>
        <div class="topMenu__balance">
          {{ $t("user.balance") }}: {{ Number.parseFloat(balance).toFixed(2) }}
        </div>
      </div>
      <div class="topMenu__miniBox topMenu__secondBox">
        <input
          v-if="!['Profile', 'Профиль', 'Groups', 'Группы'].includes(pageName)"
          class="inp"
          type="month"
          v-model="month"
        />
        <router-link
          class="topMenu__miniBox_accBtn"
          to="/accounts"
          data-test="accountsLink"
          v-if="accLatter"
        >
          {{ accLatter }}
        </router-link>
        <MenuBtnIcon :onClick="menuOpen" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuBtnIcon from "../icons/MenuBtn.vue";
import Navigation from "./Navigation.vue";

export default {
  name: "top-menu",
  components: {
    MenuBtnIcon,
    Navigation,
  },
  data() {
    return {
      locale: "en",
      isMenuOpen: false,
      month: this.period ? this.period : new Date().toISOString().slice(0, 7),
    };
  },
  props: [
    "pageName",
    "logOut",
    "balance",
    "period",
    "changePeriod",
    "accLatter",
    "accOpenHandler",
  ],
  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
      this.locale = locale;
    },
    menuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
  mounted() {
    const locale = localStorage.getItem("locale");
    if (locale) this.switchLocale(locale);
  },
  watch: {
    async month() {
      await this.changePeriod(this.month);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.topMenu {
  padding: 1.6rem 5rem;
  background-color: $white;

  display: flex;
  justify-content: space-between;
  color: $black;
  align-items: center;

  &__miniBox {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    align-items: flex-end;

    &_accBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.8rem;
      height: 3.4rem;
      padding: 0;
      border-radius: 100%;
      border: 2px solid $black;
      font-size: 1.6rem;
      cursor: pointer;
      transition-duration: 1s;
      font-weight: 700;
      color: $black;
      text-decoration: none;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    cursor: pointer;
  }

  &__balance {
    font-size: 1.8rem;
  }
}

.inp {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;

  &:focus {
    outline: none;
  }
}

.betaVersion {
  font-size: 1rem;
}
@media all and (min-width: 0) and (max-width: 940px) {
  .topMenu {
    padding: 1.6rem 2rem;
  }
}
@media all and (min-width: 0) and (max-width: 640px) {
  .topMenu {
    flex-direction: column;
    gap: 1rem;
    align-items: normal;
  }

  .topMenu__secondBox {
    justify-content: flex-end;
  }

  .topMenu__miniBox {
    gap: 1.4rem;
  }
  .topMenu__balance {
    font-size: 1.4rem;
  }
}

@media all and (min-width: 0) and (max-width: 500px) {
  .topMenu {
    padding: 1.4rem 1.2rem;
  }
  .inp {
    padding: 5px 20px;
  }
}
</style>
