<template>
  <div class="main">
    <div class="greeting-bar">
      <h2 class="greeting-text">
        {{ greet }}, <span class="user-name">Name</span>
      </h2>
    </div>

    <div class="main-content container mt-4">
      <div
        v-for="(apps, category) in orderedApplications"
        :key="category"
        class="category-section mb-5"
      >
        <h5 class="fw-bold mb-3 category-title">
          {{ category === "Uncategorized" ? "Others" : category }}
        </h5>

        <div class="app-grid">
          <div
            v-for="app in apps"
            :key="app.id"
            class="app-card"
            @click="goToApp(app.url)"
            :class="app.active ? 'activeApp' : 'inactiveApp'"
          >
            <div class="app-content">
              <span class="material-icons app-icon">
                {{ app.icon ? app.icon.toLowerCase() : "apps" }}
              </span>
              <p class="app-title">{{ app.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return { isLoading: true };
  },
  computed: {
    greet() {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 17) return "Good Afternoon";
      return "Good Evening";
    },

    ...mapGetters("Application", ["categorizedApplications"]),

    orderedApplications() {
      if (!this.categorizedApplications) return {};
      const apps = { ...this.categorizedApplications };
      const ordered = {};
      const keys = Object.keys(apps).filter((k) => k !== "Uncategorized");
      keys.sort();
      keys.forEach((k) => (ordered[k] = apps[k]));
      if (apps["Uncategorized"])
        ordered["Uncategorized"] = apps["Uncategorized"];
      return ordered;
    },
  },
  methods: {
    ...mapActions("Application", ["fetchApplications"]),

    goToApp(url) {
      console.log(url);
      this.$router.push(`${url}`);
    },
  },
  async mounted() {
    try {
      await this.fetchApplications();
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.main {
  padding-top: 2rem;
  min-height: 100vh;
  background: #f9fbfd;
  font-family: "Inter", sans-serif;
}

.greeting-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 3rem;
  padding-top: 4rem;

  margin: 0 auto 2rem;
  width: 75%;
}

.greeting-text {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1e293b;
}

.user-name {
  color: #1846e8;
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
  border-left: 4px solid #1846e8;
  padding-left: 10px;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 18px;
}

.app-card {
  position: relative;
  background: #1846e8;
  color: #fff;
  height: 140px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 6px rgba(24, 70, 232, 0.15);
}

.inactiveApp {
  background-color: #5a5a5b;
  opacity: 0.6;
  pointer-events: none;
  cursor: not-allowed;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(24, 70, 232, 0.25);
}

.app-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.app-title {
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  max-width: 130px;
  word-wrap: break-word;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .greeting-bar {
    flex-direction: column;
    text-align: center;
    padding: 1rem 1.5rem;
  }
  .greeting-text {
    font-size: 1.3rem;
  }
  .app-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>
