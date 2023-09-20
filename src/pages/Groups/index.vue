<template>
  <Overlay v-slot="slotProps">
    <Preloader v-if="isLoading" />
    <div class="groups" v-else>
      <TopMenu
        :logOut="slotProps.logOut"
        :balance="balance"
        :pageName="$t('common.groupManagement')"
      />
      <div class="groups__container">
        <Groups
          :items="groups"
          :title="$t('user.costsGroups')"
          type="costs"
          :editGroupTitle="editGroupTitle"
          :deleteGroup="deleteGroup"
        />
        <Groups
          :items="sources"
          :title="$t('user.incomesSources')"
          type="incomes"
          :editGroupTitle="editGroupTitle"
          :deleteGroup="deleteSource"
        />
      </div>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../../components/partials/Overlay.vue";
import TopMenu from "../../components/partials/TopMenu.vue";
import Preloader from "../../components/partials/Preloader.vue";
import Groups from "./Groups.vue";

import {
  getInitialDataService,
  changeGroupNameService,
  changeSourceNameService,
  deleteGroup,
  deleteSource,
} from "./services";

export default {
  name: "GroupManagement",
  data() {
    return {
      isLoading: false,
      balance: 0,
      groups: [],
      sources: [],
    };
  },
  components: { Overlay, TopMenu, Preloader, Groups },
  methods: {
    isLoadingToggle(state) {
      this.isLoading = state;
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
    async editGroupTitle(group, type, editClose) {
      const token = localStorage.getItem("token");
      let result = false;
      if (type === "costs") {
        result = await changeGroupNameService(
          group,
          token,
          (msg) => {
            this.msg = msg;
            setTimeout(() => (this.msg = ""), 5000);
          },
          editClose
        );
      } else if (type === "incomes") {
        result = await changeSourceNameService(
          group,
          token,
          (msg) => {
            this.msg = msg;
            setTimeout(() => (this.msg = ""), 5000);
          },
          editClose
        );
      }

      if (result) {
        const accountId = localStorage.getItem("accountId");
        await getInitialDataService(token, accountId, this.setData);
        this.$toast(this.$t("notifications.groupOnEdit"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async deleteGroup(id) {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const result = await deleteGroup(id, token, (msg) => {
        this.msg = msg;
        setTimeout(() => (this.msg = ""), 5000);
      });
      if (result) {
        await getInitialDataService(token, accountId, this.setData);
        this.$toast(this.$t("notifications.groupOnDelete"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
    async deleteSource(id) {
      const token = localStorage.getItem("token");
      const accountId = localStorage.getItem("accountId");
      const result = await deleteSource(id, token, (msg) => {
        this.msg = msg;
        setTimeout(() => (this.msg = ""), 5000);
      });
      if (result) {
        await getInitialDataService(token, accountId, this.setData);
        this.$toast(this.$t("notifications.sourceOnDelete"));
      } else {
        this.$toast(this.$t("notifications.somethingWentWrong"));
      }
    },
  },
  async mounted() {
    await this.onMounted();
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";
.groups {
  height: 100%;
  background-color: $background;
  &__container {
    padding: 2.5rem 5rem;
    height: 90%;
    overflow-y: auto;
    display: flex;
    gap: 4rem;
  }
}

@media all and (min-width: 0) and (max-width: 900px) {
  .groups__container {
    flex-direction: column;
  }
}

@media all and (min-width: 0) and (max-width: 500px) {
  .groups__container {
    padding: 1.4rem 1.2rem;
  }
}
</style>
