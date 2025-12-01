import { API_URL } from "../../../config";
import router from "../../../Route";

export default {
	async fetchModels({ commit }) {
		try {
			const response = await fetch(`${API_URL}admin/data-model`);
			const json = await response.json();

			commit("setModel", json.data);
		} catch (err) {
			console.error("Error loading Data Models", err);
		}
	},

	async editModel({ dispatch }, model) {
		dispatch("SET_SELECTED", model, { root: true });
		router.push(`/admin/data-model/${model.uuid}`);
	},

	async updateModel({ state }, { uuid, payload }) {
		try {
			const result = await fetch(`${API_URL}admin/data-model/${uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const json = await result.json();
			console.log("DATA", result);
			return { success: true, data: json };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async deleteModel({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Data model.")) return;
		console.log(uuid, "uuid");
		await fetch(`${API_URL}admin/data-model/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchModels");
	},

	async createModel({ commit, dispatch }, payload) {
		try {
			commit("setError", null);
			const json = await fetch(
				`${API_URL}admin/data-model/add-data-model`,
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
				}
			);

			dispatch("fetchModels");
			return { success: true, data: json.data };
		} catch (error) {
			console.log("Error creating Data Model", error);
			commit("setError", error.message || "Failed to create Data Model");
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},
};
