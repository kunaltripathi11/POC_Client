import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchApplications({ commit }) {
		commit("TableLoader/START_TABLE_LOADING", "applicationTable", {
			root: true,
		});

		try {
			const response = await fetch(`${API_URL}admin/application/apps`, {
				credentials: "include",
			});

			const json = await response.json();
			if (!response.ok) {
				throw new Error(json.message || "Failed to load applications");
			}
			commit("setApplication", json.data);
		} catch (error) {
			toastService.error(error.message || "Error loading applications");
			console.error("Error loading Application", error);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "applicationTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async createApplications({ commit, dispatch }, payload) {
		try {
			const response = await fetch(
				`${API_URL}admin/application/apps/add-app`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(payload),
				}
			);

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Failed to create application");
			}

			toastService.success("Application created successfully");
			await dispatch("fetchApplications");

			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(error.message || "Error creating application");
			console.error("Error creating Application", error);
			return { success: false, error: error.message };
		}
	},

	async updateApplication(_, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/application/apps/edit/${uuid}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(payload),
				}
			);

			const json = await result.json();
			if (!result.ok) {
				throw new Error(json.message || "Update failed");
			}
			toastService.success("Application updated successfully");
			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(error.message || "Error updating application");
			console.log("ERROR IN UPDATING", error);
			return { success: false };
		}
	},

	async deleteApplication({ dispatch }, uuid) {
		if (!confirm("Sure? This will delete the Application.")) return;

		try {
			const response = await fetch(
				`${API_URL}admin/application/apps/edit/${uuid}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);

			if (!response.ok) {
				throw new Error("Delete failed");
			}

			toastService.success("Application deleted successfully");
			await dispatch("fetchApplications");
		} catch (error) {
			toastService.error("Error deleting application");
			console.error("Error deleting Application", error);
		}
	},
};
