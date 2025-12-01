import { API_URL } from "../../../config";
import router from "../../../Route";

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
			const json = await response.json();
			await dispatch("fetchApplications");
			return {
				success: true,
				data: json.data,
			};
		} catch (error) {
			console.log("Error creating Application", error);
			commit("setError", error.message || "Failed to create Application");
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},

	async editApplication({ dispatch }, app) {
		console.log("router", router);
		dispatch("SET_SELECTED", app, { root: true });
		router.push(`/admin/application/apps/edit/${app.uuid}`);
	},

	async updateApplication({ state }, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/application/apps/edit/${uuid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			const json = result.json();
			return { success: true, data: json.data };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async deleteApplication({ dispatch }, uuid) {
		if (!confirm("Sure? This will delete the Application.")) return;
		await fetch(`${API_URL}admin/application/apps/edit/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchApplications");
	},
};
