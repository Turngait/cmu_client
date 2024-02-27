<template>
  <div>
    <input
      v-model="value"
      @keyup="onInput"
      @change="onChange"
      :class="'textInput ' + className"
      :placeholder="placeholder"
      :type="typeInput"
      :name="nameInput"
      :data-test="dataTest"
      :maxlength="maxLength"
    />
  </div>
</template>

<script>
export default {
  name: "text-input",
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
    nameInput: {
      type: String,
      default: "",
    },
    typeInput: {
      type: String,
      default: "text",
    },
    className: {
      type: String,
      default: "",
    },
    val: {
      default: undefined,
    },
    maxLength: {
      default: 10000,
    },
    dataTest: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput() {
      this.$emit("inputChange", this.value);
    },
    onChange() {
      this.$emit("inputChange", this.value);
    },
  },
  mounted() {
    this.val ? (this.value = this.val) : "";
  },
};
</script>
<style lang="scss">
@import "/src/styles/main.scss";

.textInput {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;

  &:focus {
    outline: none;
  }
}
</style>
