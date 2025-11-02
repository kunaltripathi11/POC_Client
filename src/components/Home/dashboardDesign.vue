<template>
  <div class="container mt-4">
    <h3 class="fw-bold">Dashboard Designer</h3>
    <p class="text-muted">UUID: {{ uuid }}</p>

    <div v-if="dashboard">
      <h5>{{ dashboard[0].title }}</h5>
      <p>Application: {{ dashboard[0].application }}</p>
      <p>URL: {{ dashboard[0].url }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardDesign",
  props: ["uuid"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Dashboard", ["getDashboardById"]),
    dashboard() {
      console.log(this.getDashboardById);
      return this.getDashboardById;
    },
  },
  methods: {
    ...mapActions("Dashboard", ["fetchDashboardById"]),
  },
  async mounted() {
    this.fetchDashboardById(this.uuid);
  },
};
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>
