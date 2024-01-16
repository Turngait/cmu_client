<script setup>
  import { ref, onMounted, defineProps, computed } from 'vue';
  import { useStore } from 'vuex';

  import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
  import EditBtnIcon from "../../../components/icons/EditBtn.vue";

  import { showGroupName } from "../../../utils/index";

  const store = useStore();

  const props = defineProps(["target", "editTarget", "deleteTarget", "currency"]);
  const groupName = ref("");

  function onDelete() {
    props.deleteTarget(props.target.id);
  }
  function onEdit() {
    props.editTarget(props.target);
  }
  // TODO Change on i18n
  function showType(type) {
    return type === "day"
      ? "Daily"
      : "Monthly";
  }
  onMounted(() => {
    groupName.value = showGroupName(
      +props.target.group_id,
      computed(() => store.getters["costs/getCostsGroup"]).value
    );
  });

</script>

<template>
  <div class="target">
    <div class="target__headerBox">
      <h3 class="target__headerBox__title">{{ showType(props.target.type) }}</h3>
      <div class="target__headerBox__iconBox">
        <EditBtnIcon :onClick="onEdit" />
        <DeleteBtnIcon :onClick="onDelete" />
      </div>
    </div>
    <div class="target__amount">{{ props.target.amount + " " + props.currency }}</div>
    <div
      v-if="target.type === 'month'"
      class="target__info target__groupTitle"
    >
      {{ $t("costs.group") }}: {{ groupName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./TargetItem.scss";
</style>
