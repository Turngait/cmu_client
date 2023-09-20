<template>
  <div>
    <textarea
      v-model="value"
      @keyup="onChange"
      class="areaInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "text-area",
  data() {
    return {
      value: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    val: {
      default: undefined,
    },
  },
  methods: {
    onChange() {
      this.$emit("areaChange", this.value);
    },
  },
  mounted() {
    this.val ? (this.value = this.val) : "";
  },
};
</script>
<style lang="scss">
@import "/src/styles/main.scss";

.areaInput {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
}
</style>
