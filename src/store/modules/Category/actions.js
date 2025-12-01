import { API_URL } from "../../../config";
import router from "../../../Route";

export default {
	async fetchCategory({ commit }) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/categories`
			);
			const json = await response.json();

			commit("setCategories", json.data);
		} catch (err) {
			console.error("Error loading Category", err);
		}
	},

	editCategory({ dispatch }, cat) {
		console.log(cat);
		dispatch("SET_SELECTED", cat, { root: true });
		router.push(`/admin/application/categories/${cat.uuid}`);
	},

	async updateCategory({ state }, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/application/categories/${uuid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			const json = await result.json();
			return { success: true, data: json.data };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async createCategory({ dispatch }, payload) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/categories/add`,
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				throw new Error("Error Inserting Data");
			}
			dispatch("fetchCategory");
			return { success: true, data: response.data };
		} catch (err) {
			console.error("Error loading Category", err);
			return { success: false, error: err.message };
		}
	},

	async deleteCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Category.")) return;
		await fetch(`${API_URL}admin/application/categories/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchCategory");
	},
};
