<template>
  <div class="item" :class="active ? 'active' : ''">
    <div class="item__header">
      <div class="item__header__box">
        <p class="item__header__title" @click="switchAccount">
          {{ item.title }}
        </p>
        <p class="item__header__balance" @click="switchAccount">
          {{ $t("accounts.balance") }}: {{ item.balance }} {{ item.currency }}
        </p>
      </div>
      <div class="item__header__box">
        <EditBtnIcon :onClick="editOpen" :isBlack="active ? false : true" />
        <DeleteBtnIcon
          :onClick="deleteAcc"
          v-if="!isLast"
          :isBlack="active ? false : true"
        />
      </div>
    </div>
    <div class="item__descr" v-if="item.description">
      {{ item.description }}
    </div>
  </div>
</template>

<script>
import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
import EditBtnIcon from "../../../components/icons/EditBtn.vue";

export default {
  name: "AccountItem",
  props: ["item", "onDelete", "isLast", "onEdit", "onSwitch", "active"],
  components: {
    DeleteBtnIcon,
    EditBtnIcon,
  },
  methods: {
    async deleteAcc() {
      await this.onDelete(this.item.id);
    },
    editOpen() {
      this.onEdit(this.item.id);
    },
    switchAccount() {
      this.onSwitch(this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./AccountItem.scss";
</style>
