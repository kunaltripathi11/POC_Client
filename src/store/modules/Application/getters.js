export default {
	filteredApplication(state) {
		let filtered = state.applications;

		return filtered;
	},

	categorizedApplications(state) {

		let groupedApps = state.applications.reduce((groups, app) => {
			const category = app.category_name || "Uncategorized";
			if (!groups[category]) groups[category] = [];
			groups[category].push(app);
			return groups;
		}, {})

		return groupedApps

	}
}
