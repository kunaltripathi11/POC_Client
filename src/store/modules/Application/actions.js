import { API_URL } from "../../../config";

export default {
	async fetchApplications({ commit }) {
		try {
			const response = await fetch(`${API_URL}admin/application/apps`);
			const json = await response.json();
			commit("setApplication", json.data);
		} catch (err) {
			console.error("Error loading Application", err);
		}
	},

	async createApplications({ commit, dispatch }, payload) {
		commit("setError", null);
		console.log(payload);
		try {
			const response = await fetch(
				`${API_URL}admin/application/apps/add-app`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Failed to create Application"
				);
			}
			// const json = await response.json();
			await dispatch("fetchApplications");
			// return {
			// 	success: true,
			// 	data: json.data,
			// };
		} catch (error) {
			console.log("Error creating Application", error);
			commit("setError", error.message || "Failed to create Application");
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},
	// editApplication(app) {
	// 	console.log(app);
	// 	this.$router.push(`/admin/application/apps/edit/${dash.uuid}`);
	// },
	async deleteApplication({ dispatch }, uuid) {
		if (!confirm("Sure? This will delete the Application.")) return;
		await fetch(`${API_URL}admin/application/apps/edit/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchApplications");
	},
};
