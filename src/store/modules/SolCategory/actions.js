import { API_URL } from "../../../config";
import router from "../../../Route";

export default {
	async fetchSolCategory({ commit }) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories`,
				{ credentials: "include" }
			);
			const json = await response.json();

			commit("setSolCategories", json.data);
		} catch (err) {
			console.error("Error loading Solution Category", err);
		}
	},

	editSolCategory({ dispatch }, cat) {
		console.log(cat);
		dispatch("SET_SELECTED", cat, { root: true });
		router.push(`/admin/application/solution-categories/${cat.uuid}`);
	},

	async updateSolCategory({ state }, { uuid, payload }) {
		try {
			await fetch(
				`${API_URL}admin/application/solution-categories/${uuid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);
			return { success: true, data: response.data };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async deleteSolCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will hide the Category.")) return;
		await fetch(`${API_URL}admin/application/solution-categories/${uuid}`, {
			method: "DELETE",
			credentials: "include",
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
					credentials: "include",
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
