import { API_URL } from "../../../config";

export default {
	namespaced: true,
	state() {
		return {
			tags: [],
			error: null,
		};
	},
	mutations: {
		SET_TAGS(state, tags) {
			state.tags = tags;
		},

		SET_ERROR(state, error) {
			state.error = error;
		},
	},
	actions: {
		async searchTagsByInput(_, inputTag) {
			try {
				const response = await fetch(`${API_URL}admin/tags/get-tag`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",

					body: JSON.stringify({ inputTag }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				if (data && data.data) {
					return data.data;
				}
				return [];
			} catch (error) {
				return [];
			}
		},

		async addTagsToRule({ commit }, { business_rule_id, tags }) {
			console.log("Id", business_rule_id);
			console.log("Tags", tags);
			try {
				const response = await fetch(`${API_URL}admin/tags/add-tag`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},

					body: JSON.stringify({ business_rule_id, tags }),
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				commit("SET_ERROR", null);
				return data;
			} catch (error) {
				commit("SET_ERROR", error.message);
				throw error;
			}
		},
	},

	getters: {
		allTags: (state) => state.tags,

		getError: (state) => state.error,
	},
};
