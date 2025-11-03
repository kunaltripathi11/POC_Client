<template>
  <div class="dashboard-container">
    <AddWidgetDrawer
      :show="drawerVisible"
      @close="closeDrawer"
      @widget-drag-start="handleWidgetDragStart"
    />

    <div
      class="drawer-toggle"
      :class="{ 'drawer-open': drawerVisible }"
      @click="toggleDrawer"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="toggle-icon" />
    </div>

    <div class="header-section">
      <router-link to="/admin/dashboard" class="back-link">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        <span>Back to Dashboard</span>
      </router-link>

      <button class="btn btn-primary" @click="openDrawer">
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add Widget
      </button>
    </div>

    <div
      class="main-content"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      :class="{ 'drag-over': isDragOver }"
    >
      <div v-if="widgets.length === 0" class="empty-state">
        <font-awesome-icon icon="fa-solid fa-cube" class="empty-icon" />
        <h5>No Widgets Yet</h5>
        <p>Drag and drop widgets from the panel</p>
      </div>

      <div v-else class="widgets-grid">
        <div v-for="widget in widgets" :key="widget.id" class="widget-box">
          {{ widget.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddWidgetDrawer from "../Layout/addWigdetDrawer.vue";

export default {
  components: { AddWidgetDrawer },
  data() {
    return {
      drawerVisible: false,
      widgets: [],
      isDragOver: false,
      draggedWidgetType: null,
    };
  },
  methods: {
    openDrawer() {
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    },
    handleWidgetDragStart(widgetType) {
      this.draggedWidgetType = widgetType;
    },
    handleDragOver(e) {
      e.preventDefault();
      this.isDragOver = true;
    },
    handleDragLeave() {
      this.isDragOver = false;
    },
    handleDrop(e) {
      e.preventDefault();
      this.isDragOver = false;
      if (this.draggedWidgetType) {
        this.widgets.push({
          id: Date.now(),
          type: this.draggedWidgetType,
        });
        this.draggedWidgetType = null;
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  max-width: 100vw;
  padding-top: 4rem;
  padding-left: 13rem;
  /* position: relative; */
  transition: all 0.3s ease;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #1d4ed8;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
}

.drawer-toggle {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  width: 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;
}

.drawer-toggle:hover {
  width: 2.5rem;
}

.drawer-toggle.drawer-open {
  right: 20vw;
}

.toggle-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.drawer-toggle.drawer-open .toggle-icon {
  transform: rotate(180deg);
}

.main-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  min-height: 60vh;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.main-content.drag-over {
  border: 2px dashed #3b82f6;
  background-color: #f0f7ff;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 5rem 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #9ca3af;
}

/* Widgets Grid */
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.widget-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: #374151;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.widget-box:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}
</style>
