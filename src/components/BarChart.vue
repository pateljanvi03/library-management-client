<template>
  <div class="bg-white mt-6 p-4 shadow rounded-lg">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{ data: [] }]
      },
      chartOptions: {
        responsive: true
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let dates = [];
      let count = [];
      const response = await axios.get("borrowedBooks/books-by-date");
      //
      for (let index in response.data.result) {
        dates.push(response.data.result[index]._id);
        count.push(response.data.result[index].count);
      }
      //
      this.chartData.labels = dates;
      this.chartData.datasets = [
        {
          label: "Borrowed Books",
          backgroundColor: "rgb(99 102 241)",
          data: count
        }
      ];
    }
  }
};
</script>
