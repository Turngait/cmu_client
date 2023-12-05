<template>
  <button data-test="addBtn" @click="onClick" class="addBigBtn">
    <p>+</p>
  </button>
</template>

<script>
export default {
  name: "add-big-btn",
  props: ["onClick"],
};
</script>

<style lang="scss" scoped>
.addBigBtn {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #099bbb;
  border-radius: 50px;
  font-size: 6rem;
  color: #fff;
  width: 8rem;
  height: 8rem;
  filter: drop-shadow(4px 4px 10px rgba(68, 68, 68, 0.25));
  transition-duration: 0.5s;
  bottom: 3.3rem;
  right: 5rem;
  border: none;
  cursor: pointer;

  &:hover {
    filter: none;
  }
}

@media all and (min-width: 0) and (max-width: 500px) {
  .addBigBtn {
    font-size: 4rem;
    width: 6rem;
    height: 6rem;
    right: 3rem;
    bottom: 2rem;
    border: 1px solid #ffffff3f;
  }
}
</style>
