import mutations from "./mutation";
import getters from "./getters";
import actions from "./actions";

export default {
	namespaced: true,
	state() {
		return {
			rules: [],
			ruleById: [],
			columns: null,
			archivedRules: [],
		};
	},
	mutations,
	actions,
	getters,
};
