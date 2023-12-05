<template>
  <PopUp
  :header="$t('user.deleteAll')"
  :onClose="onClose"
  :dialog="true"
  >
    <div class="dialogModal__infoBox">
      {{ $t("user.deleteAllInformation") }}
    </div>
    <div class="dialogModal__btnBox">
      <Button title="Ok" :onClick="onOk" />
      <Button title="Cancel" :onClick="onClose" />
    </div>
  </PopUp>
</template>

<script>
import PopUp from '@/components/partials/PopUp.vue';
import Button from '@/components/controls/Button.vue';

export default {
  name: "DeleteAllModal",
  components: { PopUp, Button },
  props: ["onClose", "onSubmit", "email"],
  methods: {
    onOk() {
      this.onSubmit();
    }
  },
}
</script>

<style lang="scss" scoped>
.dialogModal {
  &__btnBox {
    display: flex;
    flex-direction: column;
    gap: 1.4rem
  }

  &__infoBox {
    font-size: 1.6rem;
  }
}
</style>