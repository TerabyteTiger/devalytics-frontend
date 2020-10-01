<template>
  <div class="container mx-auto my-3">
    <div class="container flex">
      <div
        class="bg-white rounded p-3 m-3 flex-grow text-center"
      >
        <h2>Total Views</h2>
        <p class="text-3xl font-bold">
          {{
            this.$store.state.articles.length == 0
              ? "Loading"
              : this.$store.getters.totalViews
          }}
        </p>
      </div>
      <div
        class="bg-white rounded p-3 m-3 flex-grow text-center"
      >
        <h2>Total Reactions</h2>
        <p class="text-3xl font-bold">
          {{
            this.$store.state.articles.length == 0
              ? "Loading"
              : this.$store.getters.totalReactions
          }}
        </p>
      </div>
    </div>
    <button
      class="bg-green-100 p-3 m-3 rounded font-bold hover:bg-green-500 hover:text-green-100"
      @click="updateCharts"
    >
      {{
        this.$store.state.articles.length == 0
          ? "Loading"
          : "Update"
      }}
    </button>
    <div class="bg-white rounded p-3 m-3">
      <h2>Daily Summary</h2>
      <p>This excludes the first day of data collected</p>
      <canvas id="dsc" height="150"></canvas>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from "chart.js";

export default {
  name: "Home",
  data() {
    return {
      dailySummaryChart: null
    };
  },
  mounted() {
    this.dailySummary();
  },
  methods: {
    dailySummary() {
      const ctx = document.getElementById("dsc");
      this.dailySummaryChart = new Chart(ctx, {
        type: "bar",
        data: this.$store.getters.dailySummary,
        options: {
          scales: {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          }
        }
      });
    },
    updateCharts() {
      this.dailySummaryChart.data = this.$store.getters.dailySummary;
      this.dailySummaryChart.update();
    }
  }
};
</script>
