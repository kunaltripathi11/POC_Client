export default {
	allApplications(state) {
		let filtered = state.applications;

		return filtered;
	},

	categorizedApplications(state) {
		let a = state.applications;

		let gp = a.filter((app) => {
			return app?.hide_app === false;
		});

		let groupedApps = gp.reduce((groups, app) => {
			const category = app.category_name || "Uncategorized";
			if (!groups[category]) groups[category] = [];
			groups[category].push(app);
			return groups;
		}, {});
		console.log(groupedApps);
		return groupedApps;
	},

	error(state) {
		return state.error;
	},
};
