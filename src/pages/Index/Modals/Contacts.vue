<template>
  <div class="overlay">
    <div class="modal">
      <p class="modal__text">
        {{ $t("index.emailContact") }}
        <a class="modal__text__link" :href="'mailto:' + email">email</a>
      </p>
      <CloseBtnIcon :onClick="onClose" />
    </div>
  </div>
</template>

<script>
import CloseBtnIcon from "../../../components/icons/CloseBtn.vue";
import { EMAIL } from "../../../config/api";

export default {
  name: "ContactsModal",
  data() {
    return {
      email: EMAIL,
    };
  },
  props: ["onClose"],
  components: {
    CloseBtnIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $black-transp;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: 42rem;
  background: $white;
  border: 1px solid rgba(230, 230, 230, 0.65);
  box-shadow: 4px 4px 8px rgba(68, 68, 68, 0.25);
  border-radius: 5px;
  color: $black;
  padding: 2.5rem;

  display: flex;
  gap: 1.4rem;
  justify-content: space-between;

  &__text {
    font-size: 1.6rem;

    &__link {
      color: $black;
    }
  }
}
</style>
