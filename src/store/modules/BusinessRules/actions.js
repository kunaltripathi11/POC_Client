import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async fetchRuleByID({ commit, state }, uuid) {
		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/${uuid}`
			);
			const json = await response.json();

			commit("setOneRule", json.data);

			state.columns = json.columns;

			return { name: json.RuleName };
		} catch (err) {
			console.log("ERROR In Fetching One rule", err);
		}
	},
	async fetchRules({ commit }) {
		try {
			const response = await fetch(`${API_URL}admin/business-rules`);
			const json = await response.json();

			commit("setRules", json.data);
		} catch (err) {
			console.error("Error loading Business Rules", err);
		}
	},

	async fetchArchivedRules({ commit }) {
		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/archive`
			);
			const json = await response.json();
			commit("setArchivedRules", json.data);
		} catch (err) {
			console.error("Error loading Business Rules", err);
		}
	},
	async editRule({ dispatch }, rule) {
		dispatch("SET_SELECTED", rule, { root: true });
		router.push(`/admin/business-rules/${rule.uuid}/edit`);
	},

	async updateRule({ state }, { uuid, payload }) {
		try {
			const result = await fetch(
				`${API_URL}admin/business-rules/${uuid}`,
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
	async archiveRule({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Rule.")) return;
		await fetch(`${API_URL}admin/business-rules/archive/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchRules");
	},

	async createBusinessRule({ commit }, payload) {
		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/add-business-rules`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},

					body: JSON.stringify(payload),
				}
			);

			const result = await response.json();

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			commit("SET_ERROR", null);
			return { success: true, data: result.data };
		} catch (error) {
			commit("SET_ERROR", error.message);
			throw error;
		}
	},

	async deleteRule({ dispatch }, uuid) {
		try {
			if (!confirm("Sure? This will Delete the Rule.")) return;
			const result = await fetch(
				`${API_URL}admin/business-rules/${uuid}`,
				{
					method: "DELETE",
				}
			);
			const json = await result.json();

			if (json.success) {
				toastService.success("Business Rule Deleted Successfully");
			}
			await dispatch("fetchArchivedRules");
			console.log();
		} catch (error) {
			console.log("ERROR ", error);
		}
	},

	async activateRule({ dispatch }, uuid) {
		try {
			if (!confirm("Sure? This will activate the rule.")) return;
			const result = await fetch(
				`${API_URL}admin/business-rules/activate/${uuid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const json = await result.json();
			if (json.success) {
				toastService.success("Rule Successfully Activated");
				dispatch("fetchArchivedRules");
				return { success: true, data: json.data };
			}
		} catch (error) {}
	},
};
