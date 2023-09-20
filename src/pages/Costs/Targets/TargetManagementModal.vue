<template>
  <AddTargetModal
    v-if="isAddTargetOpen && !editableTarget"
    :groups="groups"
    :onClose="addTargetToggle"
    :addTarget="addTarget"
  />
  <EditTargetModal
    v-else-if="editableTarget && !isAddTargetOpen"
    :onClose="closeEditModal"
    :editTarget="editTarget"
    :target="editableTarget"
  />
  <div class="overlay" v-else>
    <div class="modal">
      <div class="modal__headerBox">
        <h3 class="modal__headerBox__title">
          {{ $t("costs.targetsManagement") }}
        </h3>
        <CloseBtnIcon :onClick="onClose" />
      </div>
      <div class="targets">
        <TargetItem
          v-for="target of targets.day"
          :key="target.id"
          :target="target"
          :deleteTarget="deleteTarget"
          :editTarget="editTargetOpen"
          :currency="currency"
        />
      </div>
      <div class="targets">
        <TargetItem
          v-for="target of targets.month"
          :key="target.id"
          :target="target"
          :deleteTarget="deleteTarget"
          :editTarget="editTargetOpen"
          :currency="currency"
        />
      </div>
      <p class="modal_msg">{{ msg }}</p>
      <div class="modal__btnBox">
        <Button :onClick="addTargetToggle" :title="$t('costs.addTarget')" />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import CloseBtnIcon from "../../../components/icons/CloseBtn.vue";
import Button from "../../../components/controls/Button.vue";

import AddTargetModal from "./AddTargetModal.vue";
import EditTargetModal from "./EditTargetModal.vue";
import TargetItem from "./TargetItem.vue";

export default {
  name: "TargetManagementModal",
  data() {
    return {
      isAddTargetOpen: false,
      currency: localStorage.getItem("currency"),
      editableTarget: null,
    };
  },
  validations() {
    return {
      title: { required },
      amount: { required },
    };
  },
  components: {
    Button,
    CloseBtnIcon,
    AddTargetModal,
    TargetItem,
    EditTargetModal,
  },
  props: [
    "onClose",
    "groups",
    "addTarget",
    "msg",
    "targets",
    "deleteTarget",
    "editTarget",
  ],
  methods: {
    addTargetToggle() {
      this.isAddTargetOpen = !this.isAddTargetOpen;
    },
    closeEditModal() {
      this.editableTarget = null;
    },
    editTargetOpen(target) {
      this.editableTarget = target;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $black-transp;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: 80%;
  background: $white;
  border: 1px solid rgba(230, 230, 230, 0.65);
  border-radius: 5px;
  color: $black;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__headerBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    &__title {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }

  &__btnBox {
    text-align: center;
  }

  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}

.targets {
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
}

@media all and (min-width: 0) and (max-width: 500px) {
  .modal {
    width: 100%;
  }
}
</style>
