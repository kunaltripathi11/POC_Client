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

	async createDashboard({ commit }, formData) {
		try {
			await fetch(`http://localhost:3000/admin/dashboard/add`, {
				method: "POST",
				body: JSON.stringify(formData),
			});
		} catch (error) {
			console.log("Error Inserting data");
		}
	},
};
