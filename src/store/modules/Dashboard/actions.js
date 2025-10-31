export default {
	async fetchDashboards({ commit }) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/dashboard"
			);
			const json = await response.json();

			commit("setDashboards", json.data);
		} catch (err) {
			console.error("Error loading Dashboard", err);
		}
	},

	async deleteDashboard({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Dashboard.")) return;
		await fetch(`http://localhost:3000/admin/dashboard/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchDashboards");
	},
};
