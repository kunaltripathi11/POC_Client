import { API_URL } from "../../../config";

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
	// editCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
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
