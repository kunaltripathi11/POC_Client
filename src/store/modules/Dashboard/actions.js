import { API_URL } from "../../../config";
import router from "../../../Route";

export default {
	async fetchDashboards({ commit }) {
		try {
			const response = await fetch(`${API_URL}admin/dashboard`, {
				credentials: "include",
			});
			const json = await response.json();
			if (!response.ok) {
				const errMessage = json.message;
				throw new Error(errMessage);
			}

			commit("setDashboards", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		}
	},
	async fetchDashboardById({ commit }, uuid) {
		try {
			const response = await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				credentials: "include",
			});
			const json = await response.json();

			commit("setOneDashboard", json.data);
			commit("setError", null);
		} catch (err) {
			commit("setError", err);
			console.error("Error loading Dashboard", err);
		}
	},

	async editDashboard({ dispatch }, dash) {
		console.log("HELLO");
		dispatch("SET_SELECTED", dash, { root: true });
		router.push(`/admin/dashboard/${dash.uuid}`);
	},

	async updateDashboard({ state }, { uuid, payload }) {
		try {
			const result = await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
				credentials: "include",
			});
			const json = await result.json();
			return { success: true, data: json.data };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async deleteDashboard({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Dashboard.")) return;

		try {
			await fetch(`${API_URL}admin/dashboard/${uuid}`, {
				method: "DELETE",
				credentials: "include",
			});

			await dispatch("fetchDashboards");
		} catch (error) {
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
			const json = response.json();
			dispatch("fetchDashboards");
			return { success: true, data: json.data };
		} catch (error) {
			console.log("Error creating Application", error);
			commit("setError", error.message || "Failed to create Application");
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
