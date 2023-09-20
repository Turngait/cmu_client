<template>
  <button
    :data-test="dataTest"
    class="btn"
    :class="{ desibled: !isActive }"
    @click="onClick"
  >
    {{ title }}
  </button>
</template>
<script>
export default {
  name: "btn-common",
  props: {
    title: {
      type: String,
      default: "Button",
    },
    onClick: {
      type: Function,
      require: true,
    },
    type: {
      type: String,
      default: "one",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    dataTest: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/src/styles/main.scss";
.btn {
  background: $btn-one;
  // box-shadow: 0px 2px 1px rgba(68, 68, 68, 0.25);
  border-radius: 5px;
  border: 0;
  padding: 0.6rem 2rem;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  animation-duration: 0.5s;

  &:hover {
    background: #099bbb;
    box-shadow: none;
  }
}

.desibled {
  background: #e5e5e5;
  box-shadow: none;
  cursor: none;
  &:hover {
    background: #e5e5e5;
    box-shadow: none;
  }
}
</style>
