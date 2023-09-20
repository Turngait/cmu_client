<template>
  <div class="groupsBox">
    <h3 class="groupsBox__heading">{{ title }}</h3>
    <h3 class="groupsBox__empty" v-if="!items || !items.length">
      {{ $t("common.noGroup") }}
    </h3>
    <GroupItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :editGroupTitle="editGroupTitle"
      :type="type"
      :deleteGroup="deleteGroup"
      :canDelete="!!items.length"
    />
  </div>
</template>

<script>
import GroupItem from "./GroupItem.vue";

export default {
  name: "groups-box",
  props: ["items", "title", "editGroupTitle", "deleteGroup", "type"],
  components: {
    GroupItem,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.groupsBox {
  margin-bottom: 3rem;
  max-width: 60rem;
  background: $white;
  border-radius: 5px;
  padding: 2.5rem 3rem;
  flex-basis: 100rem;

  &__heading {
    font-size: 1.8rem;
    margin-bottom: 1.4rem;
  }

  &__empty {
    font-size: 1.4rem;
  }
}
</style>
