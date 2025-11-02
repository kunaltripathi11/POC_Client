export default {
  setDashboards(state, data) {
    state.dashboards = data;
  },

  setOneDashboard(state, data) {
    state.dashboardById = data;
  },
};
