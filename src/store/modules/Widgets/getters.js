export default {
	getAllWidgets(state) {
		console.log(state.allWidget);
		return state.allWidget;
	},

	getDashboardId(state) {
		return state.dashboard_id;
	},
};
