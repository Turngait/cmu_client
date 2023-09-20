<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__headerBox">
        <h3 class="modal__headerBox__title">{{ header }}</h3>
        <CloseBtnIcon :onClick="onClose" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CloseBtnIcon from "../icons/CloseBtn.vue";

export default {
  name: "pop-up",
  props: ["onClose", "header"],
  components: { CloseBtnIcon },
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
  width: 50rem;
  background: $white;
  border: 1px solid rgba(230, 230, 230, 0.65);
  border-radius: 5px;
  color: $black;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  &__headerBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;

    &__title {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }
}
</style>
