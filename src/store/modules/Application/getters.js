export default {
	allApplications(state) {
		let filtered = state.applications;

		return filtered;
	},

	categorizedApplications(state) {
		let a = state.applications;
		let gp = a.filter((app) => {
			return app?.hide_app === false && app?.url !== null;
		});

		let groupedApps = gp.reduce((groups, app) => {
			const category = app.category_name || "Uncategorized";
			if (!groups[category]) groups[category] = [];
			groups[category].push(app);
			return groups;
		}, {});

		return groupedApps;
	},

	error(state) {
		return state.error;
	},

	validUrls(state, getters) {
		const set = new Set();
		Object.values(getters.categorizedApplications || {}).forEach((apps) => {
			apps.forEach((app) => set.add(app.url));
		});
		return set;
	},
};
