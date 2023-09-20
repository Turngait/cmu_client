<template>
  <div class="chartPlate">
    <div class="chartPlate__headerBox">
      <p>
        <u>{{ title }}</u>
      </p>
      <p>{{ $t("common.inThisMonth") }}: {{ amount }}</p>
    </div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PopChartGraph",
  props: ["chartId", "options", "title", "amount"],
  methods: {
    setPopChart(options) {
      Chart.defaults.font.size = "14";
      Chart.defaults.color = options.color;
      const canvas = document.getElementById(options.canvasId);
      const context = canvas.getContext("2d");
      canvas.width = 300;
      canvas.height = 60;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const datasets = {
        label: options.label,
        data: [...options.data.items],
        lineTension: 0.3,
        fill: false,
        borderColor: options.color,
        backgroundColor: "transparent",
        color: options.color,
        pointBorderColor: options.color,
        pointBackgroundColor: options.color,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: "rectRounded",
      };

      const finData = {
        labels: [...options.data.days],
        datasets: [datasets],
      };

      // eslint-disable-next-line no-unused-vars
      let myChart = new Chart(context, {
        type: "line",
        data: finData,
      });
    },
  },
  mounted() {
    if (this.options) this.setPopChart(this.options);
  },
};
</script>

<style lang="scss" scoped>
.chartPlate {
  background: #ffffff;
  padding: 2rem;
  border: 1px solid #f8f8f8;
  border-radius: 5px;
  box-sizing: border-box;

  &__headerBox {
    font-size: 1.8rem;

    display: flex;
    justify-content: space-between;
  }
}
</style>
