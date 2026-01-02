import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchCategory({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "categoryTable", {
				root: true,
			});

			const response = await fetch(
				`${API_URL}admin/application/categories`,
				{ credentials: "include" }
			);
			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Failed to load categories");
			}

			commit("setCategories", json.data);
		} catch (err) {
			toastService.error(err.message || "Error loading categories");
			console.error("Error loading Category", err);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "categoryTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async updateCategory(_, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/application/categories/${uuid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);
			const json = await result.json();
			if (!result.ok) {
				throw new Error(json.message || "Update failed");
			}

			toastService.success("Category updated successfully");
			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(error.message || "Error updating category");
			console.log("ERROR IN UPDATING", error);
			return { success: false };
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
					credentials: "include",
				}
			);
			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Error inserting category");
			}

			toastService.success("Category created successfully");
			dispatch("fetchCategory");

			return { success: true, data: json.data };
		} catch (err) {
			toastService.error(err.message || "Failed to create category");
			console.error("Error creating Category", err);
			return { success: false, error: err.message };
		}
	},

	async deleteCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Category.")) return;
		try {
			const response = await fetch(
				`${API_URL}admin/application/categories/${uuid}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);

			if (!response.ok) {
				throw new Error("Delete failed");
			}

			toastService.success("Category deleted successfully");
			await dispatch("fetchCategory");
		} catch (error) {
			toastService.error("Error deleting category");
			console.error("Error deleting Category", error);
		}
	},
};
