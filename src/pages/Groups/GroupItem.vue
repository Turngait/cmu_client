<template>
  <div class="groupItem">
    <TextInput
      :val="groupTitle"
      v-if="isEdit"
      :placeholder="$t('costs.title') + '...'"
      @inputChange="(val) => (groupTitle = val)"
    />
    <div class="groupItem__title" v-else>{{ item.title }}</div>
    <div class="groupItem__iconBox">
      <template v-if="isEdit">
        <ConfirmBtnIcon :onClick="onSaveNewTitle" v-if="isEdit" />
        <DeleteBtnIcon :onClick="onEditClose" />
      </template>
      <template v-else>
        <EditBtnIcon :onClick="onEditOpen" />
        <DeleteBtnIcon v-if="canDelete" :onClick="onDelete" />
      </template>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/controls/TextInput.vue";
import DeleteBtnIcon from "../../components/icons/DeleteBtn.vue";
import EditBtnIcon from "../../components/icons/EditBtn.vue";
import ConfirmBtnIcon from "../../components/icons/ConfirmBtn.vue";

export default {
  name: "GroupItem",
  props: ["item", "editGroupTitle", "type", "deleteGroup", "canDelete"],
  components: {
    TextInput,
    DeleteBtnIcon,
    EditBtnIcon,
    ConfirmBtnIcon,
  },
  data() {
    return {
      isEdit: false,
      groupTitle: this.item.title || "",
    };
  },
  methods: {
    async onEditOpen() {
      this.isEdit = true;
    },
    async onEditClose() {
      this.isEdit = false;
    },
    async onSaveNewTitle() {
      const group = {
        id: this.item.id,
        title: this.groupTitle,
        description: this.item.description,
        account_id: this.item.account_id,
        created_at: this.item.created_at,
        order: this.item.order,
        user_id: this.item.user_id,
      };

      // TODO Some bug here. groupTitle not changed after success
      await this.editGroupTitle(group, this.type, this.onEditClose);
    },
    async onDelete() {
      await this.deleteGroup(this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.groupItem {
  color: $white;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.4rem;
  border-radius: 5px;
  padding: 1.2rem 1.4rem;
  background: linear-gradient(180deg, #2fd02b 0%, rgba(47, 208, 43, 0.74) 100%);

  &__title {
    font-size: 1.6rem;
  }

  &__iconBox {
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
  }
}
</style>
