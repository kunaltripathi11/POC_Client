import { API_URL } from "../../../config";

export default {
	async fetchRuleByID({ commit, state }, uuid) {
		try {
			const response = await fetch(
				`${API_URL}admin/business-rules/${uuid}`
			);
			const json = await response.json();

			console.log("One rule data", json);
			commit("setOneRule", json.data);
			state.columns = json.columns;

			console.log("Data", json.data);
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
	// editCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
	async deleteRule({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Rule.")) return;
		await fetch(`${API_URL}admin/business-rules/${uuid}`, {
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
};
