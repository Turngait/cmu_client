<template>
  <div class="costsInfo">
    <h3 class="costsInfo__total">
      {{ $t("common.inThisMonth") }}: {{ inThisMonth }} {{ currency }}
    </h3>
    <div class="costsInfo__targetManagement">
      <button
        @click="targetManagementToggle"
        class="costsInfo__openTManagementBtn"
      >
        {{ $t("costs.targetsManagement") }}
      </button>
      <button
        v-if="showMonthTargets"
        @click="isMonthlyTargetsOpenToggle"
        class="costsInfo__openTManagementBtn"
      >
        {{
          !isMonthlyTargetsOpen
            ? $t("costs.showMonthlyTarget")
            : $t("costs.hideMonthlyTarget")
        }}
      </button>
    </div>
  </div>
</template>

<script>


export default {
  name: "head-info",
  components: {
  },
  props: [
    "inThisMonth",
    "currency",
    "targetManagementToggle",
    "showMonthTargets",
    "isMonthlyTargetsOpen",
    "isMonthlyTargetsOpenToggle",
  ],
};
</script>

<style scoped lang="scss">
@import "./CostsInfo.scss";
</style>
