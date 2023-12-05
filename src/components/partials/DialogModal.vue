<template>
    <PopUp
    :header="text"
    :onClose="onClose"
    :dialog="true"
  >
  <div class="dialogModal__btnBox">
    <Button title="Ok" :onClick="onOk" />
    <Button title="Cancel" :onClick="onClose" />
  </div>
  </PopUp>
</template>

<script>
import PopUp from './PopUp.vue';
import Button from '../controls/Button.vue';

export default {
  name: "DialogModal",
  components: { PopUp, Button },
  props: ["onClose", "text", "onSubmit"],
  methods: {
    onOk() {
      return this.onSubmit();
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
}
</style>