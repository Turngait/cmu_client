<script setup>
  import { defineProps} from 'vue';
  const props = defineProps([
    "targets",
    "showTargetGroupName",
    "currency",
  ]);

</script>

<template>
  <div class="monthlyTargetsBox">
    <div
       v-for="target of props.targets.month"
      :key="target.id"
      class="monthlyTargetsBox__item"
    >
       {{ $t("costs.group") }}:
      {{ props.showTargetGroupName(+target.group_id) }} - {{ target.amount
      }}{{ props.currency }}. {{ $t("costs.total") }} - {{ target.groupSum
      }}{{ props.currency }}
    </div>
  </div>
</template>

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
