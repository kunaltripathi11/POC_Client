<template>
  <h1>hello</h1>
</template>

<!-- <template>


  <div class="app-page">
    <h2>{{ app?.title || "App Not Found" }}</h2>
    <p v-if="app">{{ app?.description || "No description available." }}</p>
    <p v-else>Sorry, this app does not exist or is inactive.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppView",
  data() {
    return {
      app: null,
    };
  },
  async created() {
    const currentUrl = `/${this.$route.params.appUrl}`;
    try {
      const res = await axios.get("/api/apps");
      const apps = res.data;
      this.app = apps.find((a) => a.url === currentUrl);
    } catch (err) {
      console.error("Error fetching app data:", err);
    }
  },
};
</script>

<style>
.app-page {
  padding: 2rem;
}
</style> -->
