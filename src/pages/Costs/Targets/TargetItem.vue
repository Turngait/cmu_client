<template>
  <div class="target">
    <div class="target__headerBox">
      <h3 class="target__headerBox__title">{{ showType(target.type) }}</h3>
      <div class="target__headerBox__iconBox">
        <EditBtnIcon :onClick="onEdit" />
        <DeleteBtnIcon :onClick="onDelete" />
      </div>
    </div>
    <div class="target__amount">{{ target.amount + " " + currency }}</div>
    <div
      v-if="target.type === 'month'"
      class="target__info target__groupTitle"
    >
      {{ $t("costs.group") }}: {{ groupName }}
    </div>
  </div>
</template>

<script>
import DeleteBtnIcon from "../../../components/icons/DeleteBtn.vue";
import EditBtnIcon from "../../../components/icons/EditBtn.vue";

import { showGroupName } from "../../../utils/index";

export default {
  name: "TargetItem",
  data() {
    return {
      groupName: "",
    };
  },
  components: {
    DeleteBtnIcon,
    EditBtnIcon,
  },
  props: ["target", "editTarget", "deleteTarget", "currency"],
  methods: {
    onDelete() {
      this.deleteTarget(this.target.id);
    },
    onEdit() {
      this.editTarget(this.target);
    },
    showType(type) {
      return type === "day"
        ? this.$t("costs.targetTypeDay")
        : this.$t("costs.targetTypeMonth");
    },
  },
  mounted() {
    this.groupName = showGroupName(
      +this.target.group_id,
      this.$store.state.costs.groups
    );
  },
};
</script>

<style scoped lang="scss">
@import "./TargetItem.scss";
</style>
