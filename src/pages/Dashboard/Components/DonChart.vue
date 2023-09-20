<template>
  <div class="chartPlate">
    <div class="chartPlate__headingBox">
      {{ options.text }}
    </div>
    <canvas :id="chartId" width="8" height="8"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "DonChartGraph",
  props: ["chartId", "options"],
  methods: {
    setDonChart(options) {
      const screenWidth = window.screen.width;
      let fontSizeD = 16;
      if (screenWidth < 500) fontSizeD = 10;
      if (screenWidth < 1200) fontSizeD = 20;

      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const getGroupData = (groups) => {
        const sums = [];
        const labels = [];
        const bgColors = [];
        for (const group of groups) {
          if (group.sum === 0) continue;
          sums.push(group.sum);
          labels.push(group.title);
          bgColors.push(getRandomColor());
        }
        return { sums, labels, bgColors };
      };

      const groupsData = getGroupData(options.data);
      const dataD = {
        labels: groupsData.labels,
        datasets: [
          {
            label: options.label,
            data: groupsData.sums,
            backgroundColor: groupsData.bgColors,
          },
        ],
      };
      const canvasD = document.getElementById(options.canvasId);
      const contextD = canvasD.getContext("2d");
      canvasD.width = 160;
      contextD.clearRect(0, 0, canvasD.width, canvasD.height);

      // eslint-disable-next-line no-unused-vars
      let myChartD = new Chart(contextD, {
        type: "doughnut",
        data: dataD,
        options: {
          interaction: {
            mode: "index",
          },
          plugins: {
            legend: {
              title: {
                display: false,
                text: options.text,
                font: {
                  size: fontSizeD,
                },
              },
              labels: {
                font: {
                  size: fontSizeD,
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    if (this.options) this.setDonChart(this.options);
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

  &__headingBox {
    font-size: 1.8rem;
    margin-bottom: 1.4rem;
  }
}
</style>
