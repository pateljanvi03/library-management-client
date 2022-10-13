<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <div class="py-4">
      <div>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardState label=" Total Students" type="student"></DashboardState>
          <DashboardState label="Total Books" type="books"></DashboardState>
        </dl>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardState label="Total Book Copies"  type="bookItem"></DashboardState>
          <DashboardState label="Issued  Book Copies"  type="borrowed"></DashboardState>
        </dl>
      </div>
      <BarChart></BarChart>
      <!-- <RevenueTable></RevenueTable> -->
    </div>
  </div>
</template>

<script>
import DashboardState from "../components/DashboardState.vue";
import BarChart from "../components/BarChart.vue";

export default {
  components: {
    DashboardState,
    BarChart,
  }
};
</script>

