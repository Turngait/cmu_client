<template>
  <!-- TODO Add labels -->
  <select class="slct" v-model="value" @change="onChange">
    <option v-for="item in data" :key="item.id" :value="item.id">
      {{ item.title }}
    </option>
  </select>
</template>

<script>
// Not yet tested
export default {
  name: "slct-common",
  props: ["data", "selectedId"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("selectChange", this.value);
    },
  },
  mounted() {
    this.selectedId ? (this.value = this.selectedId) : "";
  },
};
</script>
<style lang="scss" scoped>
@import "/src/styles/main.scss";

.slct {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
  background: $white;
}
</style>
