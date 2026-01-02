import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchDashboards({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "dashboardTable", {
				root: true,
			});

			const response = await fetch(`${API_URL}admin/dashboard`, {
				credentials: "include",
			});
			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Failed to load dashboards");
			}

			commit("setDashboards", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			toastService.error(err.message || "Error loading dashboards");
			console.error("Error loading Dashboard", err);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "dashboardTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async fetchDashboardById({ commit }, uuid) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "dashboardTable", {
				root: true,
			});
			const response = await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				credentials: "include",
			});
			const json = await response.json();

			commit("setOneDashboard", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "dashboardTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async updateDashboard({}, { uuid, payload }) {
		try {
			const result = await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				credentials: "include",
			});

			const json = await result.json();

			if (!result.ok) {
				throw new Error(json.message || "Update failed");
			}

			toastService.success("Dashboard updated successfully");
			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(error.message || "Error updating dashboard");
			console.log("ERROR IN UPDATING", error);
			return { success: false };
		}
	},

	async deleteDashboard({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Dashboard.")) return;

		try {
			const response = await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Delete failed");
			}

			toastService.success("Dashboard deleted successfully");
			await dispatch("fetchDashboards");
		} catch (error) {
			toastService.error("Error deleting dashboard");
			console.error("Error in Deleting", error);
		}
	},

	async createDashboard({ commit, dispatch }, payload) {
		try {
			commit("setError", null);

			const response = await fetch(`${API_URL}admin/dashboard/add`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(payload),
				credentials: "include",
			});

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || "Create failed");
			}

			toastService.success("Dashboard created successfully");
			dispatch("fetchDashboards");

			return { success: true, data: json.data };
		} catch (error) {
			toastService.error(error.message || "Failed to create dashboard");
			commit("setError", error.message);
			return { success: false, error: error.message };
		}
	},

	clearError({ commit }) {
		commit("setError", null);
	},

	async fetchApps({ commit }) {
		try {
			const response = await fetch(
				`${API_URL}admin/dashboard/fetchApps`,
				{ credentials: "include" }
			);
			const json = await response.json();
			if (!response.ok) {
				const errMessage = json.message;
				throw new Error(errMessage);
			}

			commit("setFilteredApps", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		}
	},
};
