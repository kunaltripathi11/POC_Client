export default {
	async fetchDashboards({ commit }) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/dashboard"
			);
			const json = await response.json();
			if (!response.ok) {
				const errMessage = json.message;
				throw new Error(errMessage);
			}

			commit("setDashboards", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		}
	},
	async fetchDashboardById({ commit }, uuid) {
		try {
			const response = await fetch(
				`http://localhost:3000/admin/dashboard/${uuid}`
			);
			const json = await response.json();

			commit("setOneDashboard", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		}
	},

	async deleteDashboard({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Dashboard.")) return;

		try {
			await fetch(`http://localhost:3000/admin/dashboard/${uuid}`, {
				method: "DELETE",
			});

			await dispatch("fetchDashboards");
		} catch (error) {
			console.error("Error in Deleting", error);
		}
	},

	async createDashboard({ commit, dispatch }, formData) {
		try {
			commit("setError", null);
			await fetch(`http://localhost:3000/admin/dashboard/add`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(formData),
			});

			dispatch(this.fetchDashboards);
		} catch (error) {
			console.log("Error creating Application", error);
			commit("setError", error.message || "Failed to create Application");
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},
};
