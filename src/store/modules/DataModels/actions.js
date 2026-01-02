import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchModels({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "modelTable", {
				root: true,
			});
			const response = await fetch(`${API_URL}admin/data-model`, {
				credentials: "include",
			});
			const json = await response.json();

			commit("setModel", json.data);
		} catch (err) {
			console.error("Error loading Data Models", err);
			toastService.error("Failed to load Data Models");
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "modelTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async updateModel(_, { uuid, payload }) {
		try {
			const result = await fetch(`${API_URL}admin/data-model/${uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
				credentials: "include",
			});

			const json = await result.json();

			if (!result.ok) {
				toastService.error(
					json.message || "Failed to update Data Model"
				);
				return { success: false };
			}

			toastService.success("Data Model updated successfully");
			return { success: true, data: json };
		} catch (error) {
			console.error("ERROR IN UPDATING", error);
			toastService.error("Something went wrong while updating");
			return { success: false };
		}
	},

	async deleteModel({ dispatch }, uuid) {
		if (!confirm("Are you sure? This will delete the Data Model.")) return;

		try {
			const res = await fetch(`${API_URL}admin/data-model/${uuid}`, {
				method: "DELETE",
				credentials: "include",
			});

			const json = await res.json();

			if (res.status === 409) {
				toastService.warning(json.message);
				return;
			}

			if (!res.ok) {
				toastService.error("Failed to delete Data Model");
				return;
			}

			toastService.success("Data Model deleted successfully");
			await dispatch("fetchModels");
		} catch (error) {
			console.error("Delete error:", error);
			toastService.error("Error deleting Data Model");
		}
	},

	async createModel({ commit, dispatch }, payload) {
		try {
			commit("setError", null);

			const res = await fetch(
				`${API_URL}admin/data-model/add-data-model`,
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);

			const json = await res.json();

			if (!res.ok) {
				toastService.error(
					json.message || "Failed to create Data Model"
				);
				return { success: false };
			}

			toastService.success("Data Model created successfully");
			dispatch("fetchModels");

			return { success: true, data: json.data };
		} catch (error) {
			console.error("Error creating Data Model", error);
			commit("setError", error.message || "Failed to create Data Model");
			toastService.error("Error creating Data Model");
			return { success: false };
		}
	},

	async getRulesByModelId(_, { uuid }) {
		try {
			const result = await fetch(
				`${API_URL}admin/data-model/${uuid}/rules`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			);

			const json = await result.json();

			if (!result.ok) {
				console.log("Failed to Fetch Rules");
				return { success: false };
			}

			return { success: true, data: json.data };
		} catch (error) {
			console.error("ERROR IN Fetching", error);
			return { success: false };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},
};
