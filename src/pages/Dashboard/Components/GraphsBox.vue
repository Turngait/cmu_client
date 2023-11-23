!<template>
    <div
          class="graphsBox"
          v-if="costGraphShow || incomesGraphShow"
        >
          <p
            class="graphsBox__info"
            v-if="
              (costsGarphData && !costsGarphData.days) ||
              costsGarphData.days.length < 2
            "
          >
            {{ $t("common.notEnoughData") }}
          </p>
          <div
            class="graphsBox__info__canvasBox Hide500px"
            v-if="costChartOptions"
          >
            <PopChart
              chartId="costChart"
              :options="costChartOptions"
              :title="$t('common.costs')"
              :amount="spendInMonth"
            ></PopChart>
          </div>
          <div
            class="graphsBox__info__canvasBox Hide500px"
            v-if="incomeChartOptions && incomesGraphShow"
          >
            <PopChart
              chartId="incomeChart"
              :options="incomeChartOptions"
              :title="$t('common.incomes')"
              :amount="gainByPeriod"
            />
          </div>
          <div class="graphsBox__donChartsFlex">
            <div
              class="graphsBox__donChartBox"
              v-if="groupsChartOptions"
            >
              <DonChart
                chartId="donPopChartGroups"
                :options="groupsChartOptions"
              />
            </div>
            <div
              class="graphsBox__donChartBox"
              v-if="sourcesChartOptions && incomesGraphShow"
            >
              <DonChart
                chartId="donPopChartSources"
                :options="sourcesChartOptions"
              />
            </div>
          </div>
        </div>
</template>
  
<script>
import PopChart from "./PopChart.vue";
import DonChart from "./DonChart.vue";
export default {
  name: "dashboard-graph-box",
  components: {
    PopChart,
    DonChart,
  },
  props: ["sourcesChartOptions", "incomesGraphShow", "groupsChartOptions", "gainByPeriod", "incomeChartOptions", "spendInMonth", "costsGarphData", "costGraphShow"],
}
</script>
  
<style lang="scss">
@import "/src/styles/main.scss";

.graphsBox {
  &__info {
    font-size: 1.6rem;

    &__canvasBox {
      width: 80%;
      margin-bottom: 2.6rem;
    }
  }
  &__headerBox {
    margin-top: 1rem;

    &__heading {
      font-size: 1.4rem;
      flex-basis: 5rem;
      margin-bottom: 1rem;
    }

    &__addBtn {
      border: 0;
      background: $light-green-gradient;
      color: $white;
      padding: 0.2rem 0.6rem;
      box-shadow: 0px 2px 1px rgba(68, 68, 68, 0.25);
      border-radius: 0.5rem;
      cursor: pointer;
      transition-duration: 1s;

        &:hover {
          box-shadow: none;
        }
      }
    }
    &__donChartsFlex {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 5rem;
    }
    &__donChartBox {
      width: 40rem;
    }
  }
</style>