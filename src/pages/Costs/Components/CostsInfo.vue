<script setup>
  import { defineProps } from 'vue';
  const props = defineProps([
    "inThisMonth",
    "currency",
    "targetManagementToggle",
    "showMonthTargets",
    "isMonthlyTargetsOpen",
    "isMonthlyTargetsOpenToggle",
  ]);
</script>

<template>
  <div class="costsInfo">
    <h3 class="costsInfo__total">
      {{ $t("common.inThisMonth") }}: {{ props.inThisMonth }} {{ props.currency }}
    </h3>
    <div class="costsInfo__targetManagement">
      <button
        @click="props.targetManagementToggle"
        class="costsInfo__openTManagementBtn"
      >
        {{ $t("costs.targetsManagement") }}
      </button>
      <button
        v-if="props.showMonthTargets"
        @click="props.isMonthlyTargetsOpenToggle"
        class="costsInfo__openTManagementBtn"
      >
        {{
          !props.isMonthlyTargetsOpen
            ? $t("costs.showMonthlyTarget")
            : $t("costs.hideMonthlyTarget")
        }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./CostsInfo.scss";
</style>
