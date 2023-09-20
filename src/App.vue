<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app-main",
};
</script>

<style lang="scss">
@import "./styles/main.scss";

.app {
  height: 100%;
}
</style>