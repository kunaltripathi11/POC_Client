import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchRuleByID({ commit, state }, uuid) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "rulesOverviewTable", {
				root: true,
			});
			const response = await fetch(
				`${API_URL}admin/business-rules/${uuid}`,
				{ credentials: "include" }
			);
			const json = await response.json();

			if (!response.ok) {
				throw new Error("Failed to fetch rule details");
			}

			commit("setOneRule", json.data);
			state.columns = json.columns;
			return { name: json.RuleName };
		} catch (err) {
			console.error("ERROR In Fetching One rule", err);
			toastService.error("Failed to load business rule");
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "rulesOverviewTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async fetchRules({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "rulesTable", {
				root: true,
			});
			const response = await fetch(`${API_URL}admin/business-rules`, {
				credentials: "include",
			});
			const json = await response.json();

			if (!response.ok) {
				throw new Error("Failed to fetch rules");
			}

			commit("setRules", json.data);
		} catch (err) {
			console.error("Error loading Business Rules", err);
			toastService.error("Failed to load business rules");
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "rulesTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async fetchArchivedRules({ commit }) {
		try {
			commit("TableLoader/START_TABLE_LOADING", "rulesTable", {
				root: true,
			});
			const response = await fetch(
				`${API_URL}admin/business-rules/archive`,
				{
					credentials: "include",
				}
			);
			const json = await response.json();

			if (!response.ok) {
				throw new Error("Failed to fetch archived rules");
			}

			commit("setArchivedRules", json.data);
		} catch (err) {
			console.error("Error loading Archived Rules", err);
			toastService.error("Failed to load archived rules");
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", "rulesTable", {
					root: true,
				});
			}, 2000);
		}
	},

	async editRule({ dispatch }, rule) {
		try {
			dispatch("SET_SELECTED", rule, { root: true });
			router.push(`/admin/business-rules/${rule.uuid}/edit`);
		} catch (err) {
			toastService.error("Unable to open rule for editing");
		}
	},

	async updateRule({ dispatch }, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/business-rules/${uuid}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);

			const json = await result.json();

			if (!result.ok) {
				throw new Error("Failed to update rule");
			}

			toastService.success("Business Rule updated successfully");
			dispatch("fetchRules");

			return { success: true, data: json.data };
		} catch (error) {
			console.error("ERROR IN UPDATING", error);
			toastService.error("Failed to update Business Rule");
		}
	},

	async archiveRule({ dispatch }, uuid) {
		if (!confirm("Sure? This will archive the rule.")) {
			toastService.warning("Action cancelled");
			return;
		}

		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/archive/${uuid}`,
				{ method: "DELETE", credentials: "include" }
			);

			if (!response.ok) {
				throw new Error("Failed to archive rule");
			}

			toastService.success("Business Rule archived successfully");
			await dispatch("fetchRules");
		} catch (err) {
			console.error(err);
			toastService.error("Failed to archive Business Rule");
		}
	},

	async createBusinessRule({ commit }, payload) {
		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/add-business-rules`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
					credentials: "include",
				}
			);

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to create rule");
			}

			commit("SET_ERROR", null);

			return { success: true, data: result.data };
		} catch (error) {
			commit("SET_ERROR", error.message);
			throw error;
		}
	},

	async deleteRule({ dispatch }, uuid) {
		if (!confirm("Sure? This will permanently delete the rule.")) {
			toastService.warning("Action cancelled");
			return;
		}

		try {
			const result = await fetch(
				`${API_URL}admin/business-rules/${uuid}`,
				{ method: "DELETE", credentials: "include" }
			);
			const json = await result.json();

			if (!json.success) {
				throw new Error("Delete failed");
			}

			toastService.success("Business Rule deleted successfully");
			await dispatch("fetchArchivedRules");
		} catch (error) {
			console.error("ERROR ", error);
			toastService.error("Failed to delete Business Rule");
		}
	},

	async activateRule({ dispatch }, uuid) {
		if (!confirm("Sure? This will activate the rule.")) {
			toastService.warning("Action cancelled");
			return;
		}

		try {
			const result = await fetch(
				`${API_URL}admin/business-rules/activate/${uuid}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);

			const json = await result.json();

			if (!json.success) {
				throw new Error("Activation failed");
			}

			toastService.success("Business Rule activated successfully");
			await dispatch("fetchArchivedRules");

			return { success: true, data: json.data };
		} catch (error) {
			console.error(error);
			toastService.error("Failed to activate Business Rule");
		}
	},
};
