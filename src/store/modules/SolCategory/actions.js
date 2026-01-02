import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchSolCategory({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "solCategoryTable", {
				root: true,
			});

			const response = await fetch(
				`${API_URL}admin/application/solution-categories`,
				{ credentials: "include" }
			);
			const json = await response.json();

			if (!response.ok) {
				throw new Error(
					json.message || "Failed to load solution categories"
				);
			}

			commit("setSolCategories", json.data);
		} catch (err) {
			toastService.error(
				err.message || "Error loading solution categories"
			);
			console.error("Error loading Solution Category", err);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "solCategoryTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async updateSolCategory(_, { uuid, payload }) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories/${uuid}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Update failed");
			}

			toastService.success("Solution category updated successfully");
			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(
				error.message || "Error updating solution category"
			);
			console.log("ERROR IN UPDATING", error);
			return { success: false };
		}
	},

	async deleteSolCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will hide the Category.")) return;

		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories/${uuid}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);

			if (!response.ok) {
				throw new Error("Delete failed");
			}

			toastService.success("Solution category deleted successfully");
			await dispatch("fetchSolCategory");
		} catch (error) {
			toastService.error("Error deleting solution category");
			console.error("Error deleting Solution Category", error);
		}
	},

	async createSolCategory({ commit, dispatch }, payload) {
		commit("setError", null);

		try {
			const response = await fetch(
				`${API_URL}admin/application/solution-categories/add`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);

			const json = await response.json();

			if (!response.ok) {
				throw new Error(
					json.message || "Failed to create solution category"
				);
			}

			toastService.success("Solution category created successfully");
			await dispatch("fetchSolCategory");

			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(
				error.message || "Failed to create solution category"
			);
			console.log("Error creating Solution Category", error);
			return { success: false, error: error.message };
		}
	},
};
