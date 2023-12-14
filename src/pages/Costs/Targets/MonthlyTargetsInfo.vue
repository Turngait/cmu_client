<template>
  <div class="monthlyTargetsBox">
    <div
       v-for="target of targets.month"
      :key="target.id"
      class="monthlyTargetsBox__item"
    >
       {{ $t("costs.group") }}:
      {{ showTargetGroupName(+target.group_id) }} - {{ target.amount
      }}{{ currency }}. {{ $t("costs.total") }} - {{ target.groupSum
      }}{{ currency }}
    </div>
  </div>
</template>

<script>


export default {
  name: "monthly-targets-info",
  components: {
  },
  props: [
    "targets",
    "showTargetGroupName",
    "currency",
  ],
};
</script>

<style scoped lang="scss">
@import "/src/styles/main.scss";

.monthlyTargetsBox {
  margin-bottom: 2.5rem;
  padding: 1.2rem 3rem;
  background: $white;
  border: 1px solid #f8f8f8;

  border-radius: 5px;
  &__item {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    color: $black;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
