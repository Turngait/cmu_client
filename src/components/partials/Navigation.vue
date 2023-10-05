<template>
  <div class="overlay">
    <nav class="nav">
      <div class="nav__iconBox">
        <CloseBtnIcon :onClick="closeNav" />
      </div>
      <div class="nav__linksBox">
        <router-link class="nav__linksBox__item" to="/dashboard">
          {{ $t("common.dashboard") }}
        </router-link>
        <router-link
          data-test="costsLink"
          class="nav__linksBox__item"
          to="/costs"
          >{{ $t("common.costs") }}</router-link
        >
        <router-link
          data-test="incomesLink"
          class="nav__linksBox__item"
          to="/incomes"
          >{{ $t("common.incomes") }}</router-link
        >
        <router-link
          data-test="budgetsLink"
          class="nav__linksBox__item"
          to="/budgets"
          >{{ $t("common.budgets") }}</router-link
        >
        <router-link class="nav__linksBox__item" to="/groups">{{
          $t("common.groupManagement")
        }}</router-link>
        <router-link class="nav__linksBox__item" to="/profile">{{
          $t("common.profile")
        }}</router-link>
        <button @click="logOut" class="nav__linksBox__itemBtn">
          {{ $t("common.logout") }}
        </button>
        <div>
          <select v-model="locale" class="nav__linksBox__selectLocale">
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CloseBtnIcon from "../icons/CloseBtn.vue";

export default {
  name: "nav-bar",
  data() {
    return {
      locale: this.initLocale,
    };
  },
  components: {
    CloseBtnIcon,
  },
  props: ["closeNav", "logOut", "switchLocale", "initLocale"],
  watch: {
    locale(data) {
      this.switchLocale(data);
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
  justify-content: flex-end;
}

.nav {
  position: relative;
  background-color: $white;
  width: 36rem;
  height: 55rem;
  padding: 5rem 3.5rem;

  &__iconBox {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3.5rem;
  }

  &__linksBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1.2rem;

    &__item {
      font-size: 2.4rem;
      text-decoration-line: underline;
      color: $black;
    }

    &__itemBtn {
      margin-top: 3rem;
      font-size: 2.4rem;
      text-decoration-line: underline;
      color: $black;
      background: none;
      border: none;
      cursor: pointer;
    }

    &__selectLocale {
      margin-top: 3rem;
      border-radius: 5px;
      padding: 7px 20px;
      font-size: 1.6rem;
      width: 100%;
      background: $white;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
