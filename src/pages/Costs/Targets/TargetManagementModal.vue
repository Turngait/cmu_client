<script setup>
  import { ref, defineProps } from 'vue';

  import CloseBtnIcon from "../../../components/icons/CloseBtn.vue";
  import Button from "../../../components/controls/Button.vue";

  import AddTargetModal from "./AddTargetModal.vue";
  import EditTargetModal from "./EditTargetModal.vue";
  import TargetItem from "./TargetItem.vue";

  const props = defineProps([
      "onClose",
      "groups",
      "addTarget",
      "msg",
      "targets",
      "deleteTarget",
      "editTarget",
    ]);
  const isAddTargetOpen = ref(false);
  const currency = ref(localStorage.getItem("currency"));
  const editableTarget = ref(null);

  function addTargetToggle() {
    isAddTargetOpen.value = !isAddTargetOpen.value;
  }
  function closeEditModal() {
    editableTarget.value = null;
  }
  function editTargetOpen(target) {
    editableTarget.value = target;
  }

</script>

<template>
  <AddTargetModal
    v-if="isAddTargetOpen && !editableTarget"
    :groups="props.groups"
    :onClose="addTargetToggle"
    :addTarget="props.addTarget"
    :isDailyTargetExists="props.targets.day.length > 0"
  />
  <EditTargetModal
    v-else-if="editableTarget && !isAddTargetOpen"
    :onClose="closeEditModal"
    :editTarget="props.editTarget"
    :target="editableTarget"
  />
  <div class="overlay" v-else>
    <div class="modal">
      <div class="modal__headerBox">
        <h3 class="modal__headerBox__title">
          {{ $t("costs.targetsManagement") }}
        </h3>
        <CloseBtnIcon :onClick="props.onClose" />
      </div>
      <p class="targets__heading">{{ $t('costs.dailyTargetHeading') }}</p>
      <div class="targets" v-if="props.targets.day.length === 0">
        <p class="targets__empty">{{ $t('costs.noTargetsHere') }}</p>
      </div>
      <div class="targets" v-else>
        <TargetItem
          v-for="target of props.targets.day"
          :key="target.id"
          :target="target"
          :deleteTarget="props.deleteTarget"
          :editTarget="editTargetOpen"
          :currency="currency"
        />
      </div>
      <p class="targets__heading">{{ $t('costs.monthlyTargetHeading') }}</p>
      <div class="targets" v-if="props.targets.month.length === 0">
        <p class="targets__empty">{{ $t('costs.noTargetsHere') }}</p>
      </div>
      <div class="targets" v-else>
        <TargetItem
          v-for="target of props.targets.month"
          :key="target.id"
          :target="target"
          :deleteTarget="props.deleteTarget"
          :editTarget="editTargetOpen"
          :currency="currency"
        />
      </div>
      <p class="modal_msg">{{ props.msg }}</p>
      <div class="modal__btnBox">
        <Button :onClick="addTargetToggle" :title="$t('costs.addTarget')" />
      </div>
    </div>
  </div>
</template>

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
  overflow-y: auto;

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
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }

  &__heading {
    font-size: 2rem;
  }

  &__empty {
    font-size: 1.6rem;
  }
}

@media all and (min-width: 0) and (max-width: 500px) {
  .modal {
    width: 100%;
    height: 90%;
  }
}
</style>
