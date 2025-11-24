import { API_URL } from "../../../config";

export default {
	async fetchSolCategory({ commit }) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories`
			);
			const json = await response.json();

			commit("setSolCategories", json.data);
		} catch (err) {
			console.error("Error loading Solution Category", err);
		}
	},
	// editSolCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
	async deleteSolCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will hide the Category.")) return;
		await fetch(`${API_URL}admin/application/solution-categories/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchSolCategory");
	},

	async createSolCategory({ commit, dispatch }, payload) {
		commit("setError", null);
		console.log(payload);
		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories/add`,
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
					errorData.message || "Failed to create solution category"
				);
			}
			const json = await response.json();
			await dispatch("fetchSolCategory");
			return { success: true, data: json.data };
		} catch (error) {
			console.log("Error creating Solution Category", error);
			commit(
				"setError",
				error.message || "Failed to create solution category"
			);
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},
};
