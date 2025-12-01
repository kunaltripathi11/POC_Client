export default {
	filteredRules(state) {
		let filtered = state.rules;
		return filtered;
	},

	getError: (state) => state.error,

	getRuleById(state) {
		return state.ruleById;
	},

	getColumns(state) {
		return state.columns;
	},

	getArchivedRules(state) {
		return state.archivedRules;
	},
};
