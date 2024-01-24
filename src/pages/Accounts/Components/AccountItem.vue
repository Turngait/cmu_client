<script setup>
  import { defineProps } from 'vue';
  import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
  import EditBtnIcon from "../../../components/icons/EditBtn.vue";

  const props = defineProps(["item", "onDelete", "isLast", "onEdit", "onSwitch", "active"]);

  async function deleteAcc() {
    await props.onDelete(props.item.id);
  }
  
  function editOpen() {
    props.onEdit(props.item.id);
  }
  function switchAccount() {
    props.onSwitch(props.item.id);
  }

</script>

<template>
  <div class="item" :class="props.active ? 'active' : ''">
    <div class="item__header">
      <div class="item__header__box">
        <p class="item__header__title" @click="switchAccount">
          {{ props.item.title }}
        </p>
        <p class="item__header__balance" @click="switchAccount">
          {{ $t("accounts.balance") }}: {{ props.item.balance }} {{ props.item.currency }}
        </p>
      </div>
      <div class="item__header__box">
        <EditBtnIcon :onClick="editOpen" :isBlack="props.active ? false : true" />
        <DeleteBtnIcon
          :onClick="deleteAcc"
          v-if="!props.isLast"
          :isBlack="props.active ? false : true"
        />
      </div>
    </div>
    <div class="item__descr" v-if="props.item.description">
      {{ props.item.description }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./AccountItem.scss";
</style>
