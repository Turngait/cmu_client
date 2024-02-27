<template>
  <Preloader v-if="isLoading" />
  <div class="profile" v-else>
    <DeleteAllModal :onClose="toggleDeleteAllModalHandler" :onSubmit="onDeleteAll" v-if="isDeleteAllOpen"/>
    <TopMenu
      :logOut="logOut"
      :pageName="$t('common.profile')"
      :balance="balance"
    />
    <div class="profile__container">
      <h2 class="profile__container__heading">{{ $t("user.settings") }}</h2>
      <p class="profile__container__msg">{{ msg }}</p>
      <div class="profile__container__settings">
        <div class="profile__container__settings__item">
          <h3 class="profile__container__settings__item__header">
            {{ $t("user.changeName") }}
          </h3>
          <TextInput
            :placeholder="$t('user.name') + '...'"
            :val="name"
            @inputChange="(data) => (name = data)"
            :max-length="20"
          />
          <Button
            :isActive="!v$.name.$invalid"
            :onClick="changeName"
            :title="$t('common.save')"
          />
        </div>
        <div class="profile__container__settings__item">
          <h3 class="profile__container__settings__item__header">
            {{ $t("user.changePass") }}
          </h3>
          <TextInput
            :placeholder="$t('user.oldPass') + '...'"
            @inputChange="(data) => (oldPass = data)"
            typeInput="password"
          />
          <TextInput
            :placeholder="$t('user.newPass') + '...'"
            @inputChange="(data) => (newPass = data)"
            typeInput="password"
          />
          <Button
            :isActive="!v$.newPass.$invalid"
            :onClick="changePass"
            :title="$t('common.save')"
          />
        </div>
      </div>

      <div class="profile__container__settings">
        <div class="profile__container__settings__item">
          <h3 class="profile__container__settings__item__header">
            {{ $t("user.deleteAll") }}
          </h3>
          <Button
            :onClick="toggleDeleteAllModalHandler"
            :title="$t('common.delete')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TopMenu from "../../components/partials/TopMenu.vue";
import Preloader from "../../components/partials/Preloader.vue";
import Button from "../../components/controls/Button.vue";
import TextInput from "../../components/controls/TextInput.vue";
import DeleteAllModal from './Components/DeleteAllModal.vue';
import { deleteAllInformationService } from "./services";

import {
  changeNameService,
  getInitialDataService,
  changePassService,
} from "./services";

export default {
  name: "profile-main",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      groups: [],
      sources: [],
      msg: "",
      balance: 0,
      isLoading: false,
      oldPass: "",
      newPass: "",
      email: "",
      isDeleteAllOpen: false,
    };
  },
  validations() {
    return {
      name: { required },
      newPass: { required },
    };
  },
  components: {
    TopMenu,
    Preloader,
    TextInput,
    Button,
    DeleteAllModal
  },
  methods: {
    isLoadingToggle(state) {
      this.isLoading = state;
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("accountId");
      this.$store.commit("user/resetState");
      this.$store.commit("costs/resetState");
      this.$store.commit("incomes/resetState");
      this.$router.push("/");
    },
    setData(data) {
      this.balance = data.balance;
      this.name = data.userData.name;
      this.groups = data.groups;
      this.sources = data.sources;
      this.email = data.userData.email;
    },
    async onMounted() {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      await getInitialDataService(token, accountId, this.setData);
      this.isLoadingToggle(false);
    },
    async changeName() {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const status = await changeNameService(this.name, token);
      this.isLoadingToggle(false);

      if (status === 200) {
        this.$store.commit("user/setName", this.name);
        this.$toast.info(this.$t("notifications.nameOnChange"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    async changePass() {
      this.isLoadingToggle(true);
      const token = localStorage.getItem("token");
      const status = await changePassService(this.oldPass, this.newPass, token);
      this.isLoadingToggle(false);

      if (status === 200) {
        this.$store.commit("user/setName", this.name);
        this.$toast.info(this.$t("notifications.passwordOnChange"));
      } else {
        this.$toast.info(this.$t("notifications.somethingWentWrong"));
      }
    },
    toggleDeleteAllModalHandler() {
      this.isDeleteAllOpen = !this.isDeleteAllOpen;
    },
    async onDeleteAll() {
      const token = localStorage.getItem("token");
      const result = await deleteAllInformationService(token);
      if(result.status === 200) this.logOut();
    }
  },
  async mounted() {
    await this.onMounted();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
