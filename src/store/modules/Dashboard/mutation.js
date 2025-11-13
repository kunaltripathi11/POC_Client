export default {
	setDashboards(state, data) {
		state.dashboards = data;
	},

	setFilteredApps(state, data) {
		state.filteredApps = data;
	},

	setOneDashboard(state, data) {
		state.dashboardById = data;
	},

	setError(state, data) {
		state.error = data;
	},
};
