<template>
  <svg
    @click="onClick"
    class="closeBtnIcon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 11L11 17L21 7"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: "ConfirmBtnIcon",
  props: ["onClick"],
};
</script>

<style>
.closeBtnIcon {
  cursor: pointer;
}
</style>
